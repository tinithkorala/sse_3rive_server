import morgan from "morgan";

import logger from "../util/logger.js";

// Define morgan format
const morganFormat = ":method :url :status :response-time ms";

const loggerMorganMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const [method, url, status, responseTime] = message.trim().split(" ");
      const logObject = {
        method,
        url,
        status,
        responseTime: responseTime,
      };
      logger.info(JSON.stringify(logObject));
    }
  }
})

export default loggerMorganMiddleware;