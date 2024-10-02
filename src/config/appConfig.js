export const loggerConfig = {
  level: process.env.LEVEL || "info",
  filename: process.env.FILENAME || "src/logs/app.log",
};
