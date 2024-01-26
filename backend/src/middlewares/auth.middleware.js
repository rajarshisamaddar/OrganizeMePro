import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    // Check if the authorization header is present
    if (!authorization) {
      return res.status(401).send("Authorization header is required");
    }

    const accessToken = authorization.split(" ")[1];

    // Check if the access token is present
    if (!accessToken) {
      return res.status(401).send("Access token is required");
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id);

    // Check if the user exists
    if (!user) {
      return res.status(401).send("User does not exist");
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .send("Access token is expired please refresh your tokens");
    }
    res.status(401).send(err.message);
  }
};
