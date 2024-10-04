import rateLimit from "express-rate-limit";

import { rateLimitConfig } from "../config/appConfig.js";

const { max, windowMs } = rateLimitConfig;

const rateLimiterMiddleware = rateLimit({
  max,
  windowMs,
  message: "Too many requests from this IP, please try again later.",
  headers: true,
});

export default rateLimiterMiddleware;
