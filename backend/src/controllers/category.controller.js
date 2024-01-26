import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import AsyncErrorHandler from "../utils/AsyncErrorHandler.js";
import CustomError from "../utils/CustomError.js";

const createCategory = AsyncErrorHandler(async (req, res) => {
  const { title, description, style } = req.body;

  // check body for title, description, style
  if (!title || !description || !style) {
    throw new CustomError(400, "Missing title, description or style in body!");
  }

  const userId = req.user._id; // get user id from req.user

  // one user can have one category with the same title
  const existingCategory = await Category.findOne({ title, user: userId });
  if (existingCategory) {
    throw new CustomError(400, "Category with this title already exists!");
  }

  // create new category
  const category = new Category({
    title,
    description,
    style,
    user: userId,
  });

  // save category
  const savedCategory = await category.save();

  // add category to user's categories array
  User.findByIdAndUpdate(
    userId,
    { $push: { categories: savedCategory._id } },
    { new: true }
  ).exec();

  // send response
  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "Category created successfully",
    category: savedCategory,
  });
});

const getAllCategories = AsyncErrorHandler(async (req, res) => {
  const userId = req.user._id; // get user id from req.user

  // get all categories of a user and in contributors array of a user
  const categories = await Category.find({
    $or: [{ user: userId }, { collaborators: userId }],
  });

  // send response
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Categories fetched successfully",
    categories,
  });
});

const addCollaborator = AsyncErrorHandler(async (req, res) => {
  const { categoryId, email } = req.body;

  // check body for category and email
  if (!categoryId || !email) {
    throw new CustomError(400, "Missing category or email in body!");
  }

  const userId = req.user._id; // get user id from req.user

  // get category details from category title and user id
  const categoryDetails = await Category.findById(categoryId);

  // check if category exists
  if (!categoryDetails) {
    throw new CustomError(400, "Category does not exist!");
  }

  // check if the user is the owner of the category
  if (!categoryDetails.user.equals(userId)) {
    throw new CustomError(400, "Only owner can add collaborators!");
  }

  // check if the user exists
  const newCollaboratorUser = await User.findOne({ email });
  if (!newCollaboratorUser) {
    throw new CustomError(400, "User with this email does not exist!");
  }

  // check if the user is already a collaborator
  if (categoryDetails.collaborators.includes(newCollaboratorUser._id)) {
    throw new CustomError(
      400,
      "User with this email is already a collaborator!"
    );
  }

  // add user to collaborators array
  categoryDetails.collaborators.push(newCollaboratorUser._id);
  await categoryDetails.save();

  // send response
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Collaborator added successfully",
    category: categoryDetails,
  });
});

const updateCategory = AsyncErrorHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { title, description, style } = req.body;

  // check category id in params
  if (!categoryId) {
    throw new CustomError(400, "Missing category id!");
  }

  // check body for title, description, style
  if (!(title || description || style)) {
    throw new CustomError(400, "Missing title, description and style in body!");
  }

  const userId = req.user._id; // get user id from req.user

  // get category details from category id
  const categoryDetails = await Category.findById(categoryId);

  // check if category exists
  if (!categoryDetails) {
    throw new CustomError(400, "Category does not exist!");
  }

  // check if the user is the owner of the category
  if (!categoryDetails.user.equals(userId)) {
    throw new CustomError(400, "Only owner can update category!");
  }

  // update category details with only the fields that are present in the body
  if (title) {
    categoryDetails.title = title;
  }
  if (description) {
    categoryDetails.description = description;
  }
  if (style) {
    categoryDetails.style = style;
  }

  // save category
  const savedCategory = await categoryDetails.save();

  // send response
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Category updated successfully",
    category: savedCategory,
  });
});

export { createCategory, getAllCategories, addCollaborator, updateCategory };
