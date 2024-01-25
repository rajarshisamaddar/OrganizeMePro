import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [128, "Title can be 128 characters long at most!"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [256, "Description can be 256 characters long at most!"],
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed", "archived"],
      required: [true, "Status is required"],
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
