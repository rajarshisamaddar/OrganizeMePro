import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import CustomError from "./utils/CustomError.js";
import { GlobalErrorHandler } from "./utils/GlobalErrorHandler.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "50kb" })); // for parsing application/json

app.use(express.urlencoded({ extended: true, limit: "50kb" })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser()); // for parsing cookies

// import all routes from "./routes/";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import taskRoutes from "./routes/task.routes.js";

// using all routes from "./routes/";
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/task", taskRoutes);

// 404 route handler for all other requests
app.use("*", (req, res, next) => {
  const err = new CustomError(404, "Route not found");
  next(err, req, res, next);
});

// global error
app.use(GlobalErrorHandler);

export { app };
