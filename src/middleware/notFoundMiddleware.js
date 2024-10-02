import AppError from "./../util/appError.js";
import { resourceNotFound } from "../config/errorConfig.js";

const notFoundHandler = (req, res, next) => {
  const { name, code } = resourceNotFound;
  next(
    new AppError(name, `Can't find ${req.originalUrl} on the server!`, code)
  );
};

export default notFoundHandler;
