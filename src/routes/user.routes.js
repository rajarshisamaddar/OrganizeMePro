import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import AsyncErrorHandler from "../utils/AsyncErrorHandler.js";
import {
  registerUser,
  loginUser,
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.controller.js";

const router = Router();

// COMPLETE: post => register user
router.route("/register").post(AsyncErrorHandler(registerUser));

// COMPLETE: post => login user
router.route("/login").post(verifyJWT, AsyncErrorHandler(loginUser));

// COMPLETE: get => get user details
router.route("/me/:email").get(verifyJWT, AsyncErrorHandler(getUserDetails));

// COMPLETE: patch => update user details
router
  .route("/me/:email")
  .patch(verifyJWT, AsyncErrorHandler(updateUserDetails));

// TODO: delete => delete user
// TODO: post => forgot password
// TODO: post => reset password

export default router;
