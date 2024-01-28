import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import AsyncErrorHandler from "../utils/AsyncErrorHandler.js";

// Generate new access and refresh tokens
const generateAccessAndRefreshTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken: accessToken, refreshToken: refreshToken };
  } catch (err) {
    const error = new CustomError(
      500,
      "Something went wrong while generating refresh and access token"
    );
    return next(error);
  }
};

// Register a new user with username, email, fullName, and password
const registerUser = AsyncErrorHandler(async (req, res, next) => {
  const { username, email, fullName, password, style } = req.body;

  // Check if the request body is empty
  if (!username || !email || !fullName || !password || !style) {
    const err = new CustomError(
      400,
      "Request body must contain username, email, fullName, password, and style"
    );
    return next(err);
  }

  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const err = new CustomError(400, "Invalid email format");
    return next(err);
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new CustomError(400, "User already exists");
    return next(err);
  }

  // check if the username is already taken
  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    const err = new CustomError(400, "Username already taken");
    return next(err);
  }

  const user = new User({ username, email, fullName, password, style });
  const savedUser = await user.save();

  // Check if the user was saved correctly
  if (!savedUser) {
    const err = new CustomError(500, "User could not be saved");
    return next(err);
  }

  const accessAndRefreshToken = await generateAccessAndRefreshTokens(savedUser);

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "User created successfully",
    tokens: accessAndRefreshToken,
  });
});

// Login a user with username or email and password
const loginUser = AsyncErrorHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if the request body is empty
  if ((!username && !email) || !password) {
    const err = new CustomError(
      400,
      "Request body must contain either username or email and password"
    );
    return next(err);
  }

  // check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    const err = new CustomError(400, "Invalid email format");
    return next(err);
  }

  // Check if the user exists
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    const err = new CustomError(400, "User does not exist");
    return next(err);
  }

  // Check if the password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    const err = new CustomError(400, "Invalid credentials");
    return next(err);
  }

  const accessAndRefreshToken = await generateAccessAndRefreshTokens(user);

  res.status(200).send({
    status: "success",
    statusCode: 200,
    message: "User logged in successfully",
    tokens: accessAndRefreshToken,
  });
});

// Get new access token with refresh token
const getNewAccessToken = AsyncErrorHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  // Check if the request body is empty
  if (!refreshToken) {
    const err = new CustomError(400, "Request body must contain refreshToken");
    return next(err);
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  // Check if the refresh token is valid
  if (!decoded) {
    const err = new CustomError(401, "Invalid refresh token");
    return next(err);
  }

  // Check if the user exists
  const user = await User.findOne({ username: decoded.username });

  // Check if the user exists
  if (!user) {
    const err = new CustomError(401, "Invalid refresh token");
    return next(err);
  }

  // Check if the refresh token is the same as the one in the database
  if (refreshToken !== user.refreshToken) {
    const err = new CustomError(401, "Refresh token is expired or tampered");
    return next(err);
  }

  const accessAndRefreshToken = await generateAccessAndRefreshTokens(user);

  res.status(200).send({
    status: "success",
    statusCode: 200,
    message: "New tokens generated successfully",
    tokens: accessAndRefreshToken,
  });
});

// Get current user details
const getUserDetails = AsyncErrorHandler(async (req, res, next) => {

  // Check if the user exists

  const user = await User.findOne(
    { email: req.user.email, accessToken: req.user.accessToken },
    {
      password: 0,
      refreshToken: 0,
      __v: 0,
      _id: 0,
      createdAt: 0,
      updatedAt: 0,
    }
  );

  // Check if the user exists
  if (!user) {
    const err = new CustomError(400, "User does not exist");
    return next(err);
  }

  res.status(200).send(user);
});

// Update user details with email
const updateUserDetails = AsyncErrorHandler(async (req, res, next) => {
  const { email } = req.params;

  // Check if the email is valid
  if (!email) {
    const err = new CustomError(400, "Email in params is required");
    return next(err);
  }

  // check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    const err = new CustomError(400, "Invalid email format");
    return next(err);
  }

  // Check if the request body is empty
  if (Object.keys(req.body).length === 0) {
    const err = new CustomError(400, "Request body cannot be empty");
    return next(err);
  }

  // Check if the user is the same as the one in the token
  if (email !== req.user.email) {
    const err = new CustomError(401, "You are trying to modify another user");
    next(err);
  }

  // Check if the user exists
  const user = await User.findOne({
    email,
    refreshToken: req.user.refreshToken,
  });

  if (!user) {
    const err = new CustomError(400, "User does not exist");
    return next(err);
  }

  // Update user details
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { ...req.body },
    { new: true, runValidators: true }
  ).select("-password -refreshToken -__v -_id -createdAt -updatedAt");

  // Check if the user was updated correctly
  if (!updatedUser) {
    const err = new CustomError(500, "User could not be updated");
    next(err);
  }

  res.status(200).send(updatedUser);
});

export {
  registerUser,
  loginUser,
  getNewAccessToken,
  getUserDetails,
  updateUserDetails,
};
