export const loggerConfig = {
  level: process.env.LEVEL || "info",
  filename: process.env.FILENAME || "logs/app.log",
};
