import "dotenv/config";

// Handle application uncaughtExceptions
process.on("uncaughtException", (error) => {
  console.log("Server closed due to unhandled exception ", error);
  setTimeout(() => {
    process.exit(1);
  }, 100);
});

import app from "./app.js";
import sequelize from "./models/associations.js";
import logger from "./util/logger.js";
import exitServer from "./util/exitServer.js";

// Server configuration
const PORT = process.env.PORT || 5000;

console.log("DB:", process.env.PG_DB);
console.log("PORT:", process.env.PORT);

let server;

const shutdownServer = (message, stack) => {
  logger.error({ message, stack });
  if (server) {
    server.close(() => {
      exitServer();
    });
  } else {
    exitServer();
  }
};

const startServer = async () => {
  try {
    // Authenticate the Sequelize connection
    await sequelize.authenticate();
    logger.info("Database connected successfully.");

    await sequelize.sync();
    logger.info("All models were synchronized successfully.");

    // Server Listen
    server = app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    shutdownServer(error.message, error.stack);
  }
};

process.on("unhandledRejection", (error) => {
  const message =
    error?.message || "Server closed due to unhandled promise rejection";
  const stack = error?.stack || null;
  shutdownServer(message, stack);
});

startServer();