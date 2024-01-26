import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createCategory,
  getAllCategories,
  addCollaborator,
  updateCategory,
} from "../controllers/category.controller.js";

const router = Router();

// COMPLETE: post => create new category
router.route("/create").post(verifyJWT, createCategory);

// COMPLETE: get => get all categories
router.route("/get-all-categories").get(verifyJWT, getAllCategories);

// COMPLETE: post => add collaborator to category
router.route("/add-collaborator").post(verifyJWT, addCollaborator);

// TODO: patch => update category details by owner only
router.route("/update/:categoryId").patch(verifyJWT, updateCategory);

// TODO: get => get all tasks in a category
// TODO: delete => delete category

export default router;
