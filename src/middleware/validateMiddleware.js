import { validationError } from "../config/errorConfig.js";
import AppError from "../util/appError.js";

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { name, code } = validationError;
      const errorMessage = error.details?.[0]?.message || "Error in the request data.";
      return next(new AppError(name, errorMessage, code));
    }
    next();
  };
};

export default validateMiddleware;
