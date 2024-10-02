import { createLogger, format, transports } from "winston";
import { loggerConfig } from "../config/appConfig.js";

const { combine, timestamp, json, colorize, printf } = format;

// Custom format for console logging
const consoleLogFormat = combine(
  colorize(),
  printf(({ level, message }) => {
    return `${level}: ${message}`;
  })
);
// Custom format for file logging
const fileLogFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  level: loggerConfig.level,
  format: combine(timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({
      filename: loggerConfig.filename,
      format: combine(timestamp(), fileLogFormat),
    }),
  ],
});

export default logger;
