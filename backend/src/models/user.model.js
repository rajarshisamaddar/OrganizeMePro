import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required!"],
      trim: true,
      maxlengh: [64, "Full name can not exceed 64 characters!"],
    },
    theme: {
      type: String,
      default: "light",
      enum: ["light", "dark"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
      minlength: [8, "Password needs to be at least 8 characters!"],
    },
    todos: [{ type: Schema.Types.ObjectId, ref: "Task" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    accessToken: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

UserSchema.methods.generateAccessToken = function () {
  this.accessToken = jwt.sign(
    { _id: this._id, email: this.email, fullName: this.fullName },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
