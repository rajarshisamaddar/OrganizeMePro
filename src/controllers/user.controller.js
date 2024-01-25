import { User } from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";

const registerUser = async (req, res, next) => {
  const { email, fullName, password } = req.body;

  // Check if the request body is empty
  if (!email || !fullName || !password) {
    const err = new CustomError(
      400,
      "Request body must contain email, fullName, and password"
    );
    return next(err);
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new CustomError(400, "User already exists");
    return next(err);
  }

  const user = new User({ email, fullName, password });
  const savedUser = await user.save();

  // Check if the user was saved correctly
  if (!savedUser) {
    const err = new CustomError(500, "User could not be saved");
    return next(err);
  }

  savedUser.generateAccessToken();
  await savedUser.save();

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "User created successfully",
    accessToken: savedUser.accessToken,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the request body is empty
  if (!email || !password) {
    const err = new CustomError(
      400,
      "Request body must contain email and password"
    );
    return next(err);
  }

  // Check if the user exists
  const user = await User.findOne({ email });
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

  user.generateAccessToken();
  await user.save();

  res.status(200).send({
    status: "success",
    statusCode: 200,
    message: "User logged in successfully",
    accessToken: user.accessToken,
  });
};

const getUserDetails = async (req, res) => {
  const { email } = req.params;

  // Check if the email is valid
  if (!email) {
    const err = new CustomError(400, "Email in params is required");
    return next(err);
  }

  if (email != req.user.email) {
    const err = new CustomError(401, "You are trying to access another user");
    return next(err);
  }

  // Check if the user exists

  const user = await User.findOne(
    { email, accessToken: req.user.accessToken },
    {
      password: 0,
      accessToken: 0,
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
};

const updateUserDetails = async (req, res) => {
  const { email } = req.params;

  // Check if the email is valid
  if (!email) {
    const err = new CustomError(400, "Email in params is required");
    return next(err);
  }

  // Check if the request body is empty
  if (Object.keys(req.body).length === 0) {
    const err = new CustomError(400, "Request body cannot be empty");
    return next(err);
  }

  // Check if the user is the same as the one in the token
  if (email != req.user.email) {
    const err = new CustomError(401, "You are trying to modify another user");
    next(err);
  }

  // Check if the user exists
  const user = await User.findOne({
    email,
    accessToken: req.user.accessToken,
  });

  if (!user) {
    const err = new CustomError(400, "User does not exist");
    return next(err);
  }

  // Update user details
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { ...req.body },
    { new: true }
  ).select("-password -accessToken -__v -_id -createdAt -updatedAt");

  // Check if the user was updated correctly
  if (!updatedUser) {
    const err = new CustomError(500, "User could not be updated");
    next(err);
  }

  res.status(200).send(updatedUser);
};

export { registerUser, loginUser, getUserDetails, updateUserDetails };
