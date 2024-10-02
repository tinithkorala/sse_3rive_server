const globalErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const status = error.status || "error";
  const message = error.message || "Error Occured";
  const name = error.name || "Error";

  res.status(statusCode).json({
    name,
    status,
    message,
  });
}

export default globalErrorHandler;