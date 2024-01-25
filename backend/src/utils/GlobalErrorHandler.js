export const GlobalErrorHandler = (err, req, res, next) => {
  // console.log(err);
  // console.log(err.stack);

  if (err.name === "ValidationError") {
    err.statusCode = 403;
  } else {
    err.statusCode = err.statusCode || 500;
  }

  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
