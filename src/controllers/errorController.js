import { badRequest } from "../config/errorConfig.js";
import AppError from "../util/appError.js";
import logger from "../util/logger.js";

const { name: BadRqName, code: BadRqCode } = badRequest;

const handleCastErrorDb = (error) => {
  let message = "Invalid input!";
  if (error.parent && error.parent.code === "22P02") {
    message = "Invalid input for integer!";
  } else if (error.parent && error.parent.code === "22003") {
    message = "Invalid input for integer! Value is out of range.!";
  }
  return new AppError(BadRqName, message, BadRqCode);
};

const handleSequelizeValidationErrorDb = (error) => {
  const errorMessage =
    error.errors[0]?.message || "An unknown validation error occurred.";
  return new AppError(
    BadRqName,
    `Unique Constraint Error: ${errorMessage}`,
    BadRqCode
  );
};

const handleSequelizeUniqueConstraintErrorDb = (error) => {
  const errorMessage =
    error.errors[0]?.message || "A unique constraint error occurred.";
  return new AppError(
    BadRqName,
    `Unique Constraint Error: ${errorMessage}`,
    BadRqCode
  );
};

const sendErrorResDev = (error, res) => {
  res.status(error.statusCode).json({
    name: error.name,
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorResProd = (error, res) => {
  if (error.isOperational) {
    // Tursted errors
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  } else {
    // Unknown errors
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const globalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "Error Occured";
  const name = error.name || "Error";
  const stack = error.stack || "";
  const isOperational = error.isOperational || false;

  logger.error({ message, stack });

  if (process.env.NODE_ENV === "development") {
    sendErrorResDev({ statusCode, status, message, name, stack }, res);
  } else if (process.env.NODE_ENV === "production") {
    let errorClone = { ...error };
    if (error.name === "SequelizeDatabaseError") {
      errorClone = handleCastErrorDb(errorClone);
    } else if (error.name === "SequelizeValidationError") {
      errorClone = handleSequelizeValidationErrorDb(errorClone);
    } else if (error.name === "SequelizeUniqueConstraintError") {
      errorClone = handleSequelizeUniqueConstraintErrorDb(errorClone);
    }
    let { statusCode, status, message, isOperational } = errorClone;
    sendErrorResProd({ statusCode, status, message, isOperational }, res);
  }
};

export default globalErrorHandler;
