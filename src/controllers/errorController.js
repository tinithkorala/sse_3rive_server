import logger from "../util/logger.js";

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
  console.log(error);
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "Error Occured";
  const name = error.name || "Error";
  const stack = error.stack || "";

  logger.error({ message, stack });

  if (process.env.NODE_ENV === "development") {
    sendErrorResDev({ statusCode, status, message, name, stack }, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorResProd({ statusCode, status, message }, res);
  }
};

export default globalErrorHandler;
