import rateLimit from "express-rate-limit";

import { rateLimitConfig } from "../config/appConfig.js";
import logger from "../util/logger.js";

const { max, windowMs } = rateLimitConfig;

const logRateLimitError = (req, res, next, options) => {
  const { ip, method, originalUrl } = req;
  const message = `Rate limit exceeded: ${ip} tried to ${method} ${originalUrl}`;
  logger.error({message, stack: ''})
  res.status(options.statusCode).json({
    status: "fail",
    message: options.message || "Too many requests, please try again later.",
  });
};

const rateLimiterMiddleware = rateLimit({
  max,
  windowMs,
  message: "Too many requests from this IP, please try again later.",
  headers: true,
  handler: (req, res, next, options) => {
    logRateLimitError(req, res, next, options);
  },
});

export default rateLimiterMiddleware;
