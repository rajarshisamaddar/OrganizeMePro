import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: [128, "Category name can be 128 characters long at most!"],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [256, "Description can be 256 characters long at most!"],
    },
    style: {
      type: Object,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    todo: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
    collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", CategorySchema);
