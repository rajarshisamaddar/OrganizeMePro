import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [128, "Category name can be 128 characters long at most!"],
      unique: [true, "Category with this name already exists"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    todo: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", CategorySchema);
