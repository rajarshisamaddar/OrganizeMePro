import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  registerUser,
  loginUser,
  getNewAccessToken,
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.controller.js";

const router = Router();

// COMPLETE: post => register user
router.route("/register").post(registerUser);

// COMPLETE: post => login user
router.route("/login").post(loginUser);

// COMPLETE: get => new access token and refresh token using refresh token
router.route("/refresh-tokens").get(getNewAccessToken);

// COMPLETE: get => get user details using email
router.route("/me/:email").get(verifyJWT, getUserDetails);

// COMPLETE: patch => update user details using email
router.route("/me/:email").patch(verifyJWT, updateUserDetails);

// TODO: delete => delete user
// TODO: post => forgot password
// TODO: post => reset password

export default router;
