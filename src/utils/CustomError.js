class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.message = message;

    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;