import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";
import { Category } from "../models/category.model.js";
import CustomError from "../utils/CustomError.js";
import AsyncErrorHandler from "../utils/AsyncErrorHandler.js";

const createTask = AsyncErrorHandler(async (req, res) => {
  const { category, title, description, status, assignedTo, dueDate } =
    req.body;

  // check if body is empty
  switch (true) {
    case !category:
      throw new CustomError(400, "Category is required!");
    case !title:
      throw new CustomError(400, "Title is required!");
    case !description:
      throw new CustomError(400, "Description is required!");
    case !dueDate:
      throw new CustomError(400, "Due date is required!");
  }

  // check if category exists
  const userCategory = await Category.findOne({
    _id: category,
  });

  if (!userCategory) {
    throw new CustomError(400, "Category does not exist!");
  }

  // check if user has permission to create task in this category

  const permission =
    userCategory.user.equals(req.user._id) ||
    userCategory.collaborators.includes(req.user._id);

  if (!permission) {
    throw new CustomError(
      403,
      "You do not have permission to create task in this category!"
    );
  }

  // check if assignedTo exists
  let assignedUser = undefined;
  if (assignedTo) {
    assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      throw new CustomError(400, "Assigned user does not exist!");
    }
  }

  // create task

  const task = new Task({
    user: req.user._id,
    category,
    title,
    description,
    status: status || "pending",
    assignedTo: assignedTo || req.user._id,
    dueDate,
  });

  // save task
  await task.save();

  res.status(201).json({ success: true, data: task });
});

const getAllTasks = AsyncErrorHandler(async (req, res) => {
  // find all tasks of a req.user._id by two ways
  // 1. user is present in user field of task document
  // 2. user is present in collaborators field of category document but the task have only category id so we need to populate category field of task document to get category details and then check if user is present in collaborators field of category document or not and then return tasks

  const tasks = await Task.find({
    $or: [
      { user: req.user._id },
      {
        category: {
          $in: await Category.find({
            $or: [{ user: req.user._id }, { collaborators: req.user._id }],
          }).distinct("_id"),
        },
      },
    ],
  }).populate("category");

  res.status(200).json({
    status: "success",
    statusCode: 201,
    message: "Tasks fetched successfully",
    tasks: tasks,
  });
});

const getTasksByCategory = AsyncErrorHandler(async (req, res) => {
  const categoryId = req.params.categoryId;

  // check if params is empty
  if (!categoryId) {
    throw new CustomError(400, "Category id is required!");
  }

  // check if category exists
  const category = await Category.findOne({
    _id: categoryId,
  });

  if (!category) {
    throw new CustomError(400, "Category does not exist!");
  }

  // check if user has permission to get tasks in this category

  const permission =
    category.user.equals(req.user._id) ||
    category.collaborators.includes(req.user._id);

  if (!permission) {
    throw new CustomError(
      403,
      "You do not have permission to get tasks in this category!"
    );
  }

  // get tasks in this category

  const tasks = await Task.find({
    category: categoryId,
  }).populate("category");

  res.status(200).json({
    status: "success",
    statusCode: 201,
    message: "Tasks fetched successfully",
    tasks: tasks,
  });
});

export { createTask, getAllTasks, getTasksByCategory };
