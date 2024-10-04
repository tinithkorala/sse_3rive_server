export const loggerConfig = {
  level: process.env.LEVEL || "info",
  filename: process.env.FILENAME || "src/logs/app.log",
};

export const rateLimitConfig = {
  max: process.env.RATE_LIMIT_MAX || 1000,
  windowMs: process.env.RATE_LIMIT_WINDOWMS || 15 * 60 * 1000,
}