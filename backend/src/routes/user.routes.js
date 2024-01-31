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

// ALPHA: post => register user
router.route("/register").post(registerUser);

// ALPHA: post => login user
router.route("/login").post(loginUser);

// ALPHA: get => new access token and refresh token using refresh token
router.route("/refresh-tokens").post(getNewAccessToken);

// TODO: get => get user details using id

// ALPHA: get => get user details using jwt token
router.route("/me").get(verifyJWT, getUserDetails);

// ALPHA: patch => update user details using email
router.route("/me/:email").patch(verifyJWT, updateUserDetails);

// TODO: delete => delete user
// TODO: post => forgot password
// TODO: post => reset password

export default router;
