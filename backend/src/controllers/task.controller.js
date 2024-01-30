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

// get tasks details by id

const getTaskById = AsyncErrorHandler(async (req, res) => {
  const taskId = req.params.taskId;

  // check if params is empty
  if (!taskId) {
    throw new CustomError(400, "Task id is required!");
  }

  // check if task exists
  const task = await Task.findOne({
    _id: taskId,
  }).populate("category");

  if (!task) {
    throw new CustomError(400, "Task does not exist!");
  }

  // check if user has permission to get this task

  const permission =
    task.user.equals(req.user._id) ||
    task.category.user.equals(req.user._id) ||
    task.category.collaborators.includes(req.user._id);

  if (!permission) {
    throw new CustomError(403, "You do not have permission to get this task!");
  }

  res.status(200).json({
    status: "success",
    statusCode: 201,
    message: "Task fetched successfully",
    task: task,
  });
});

// update task details by id

const updateTaskById = AsyncErrorHandler(async (req, res) => {
  const taskId = req.params.taskId;

  // check if params is empty
  if (!taskId) {
    throw new CustomError(400, "Task id is required!");
  }

  // check if task exists
  const task = await Task.findOne({
    _id: taskId,
  }).populate("category");

  if (!task) {
    throw new CustomError(400, "Task does not exist!");
  }

  // check if user has permission to update this task

  const permission =
    task.user.equals(req.user._id) ||
    task.category.user.equals(req.user._id) ||
    task.category.collaborators.includes(req.user._id);

  if (!permission) {
    throw new CustomError(
      403,
      "You do not have permission to update this task!"
    );
  }

  // update task
  const { title, description, status, assignedTo, dueDate } = req.body;

  // check if body is empty
  if (Object.keys(req.body).length === 0) {
    throw new CustomError(
      400,
      "At least one field is required to update the task!"
    );
  }

  // check if assignedTo exists
  if (assignedTo) {
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      throw new CustomError(400, "Assigned user does not exist!");
    }

    // check if assigned user is in the task category collaborators or is the task creator
    const category = await Category.findById(task.category);
    if (
      !category.collaborators.includes(assignedTo) &&
      String(task.user) !== String(assignedTo)
    ) {
      throw new CustomError(
        400,
        "User not in collaborators list and is not the task creator!"
      );
    }
  }

  // update task
  for (let prop in req.body) {
    task[prop] = req.body[prop];
  }

  // save task
  await task.save();

  res.status(201).json({ success: true, data: task });
});

export {
  createTask,
  getAllTasks,
  getTasksByCategory,
  getTaskById,
  updateTaskById,
};
