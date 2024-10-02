import express from "express";

import loggerMorganMiddleware from "./middleware/loggerMorganMiddleware.js";
import notFoundHandler from "./middleware/notFoundMiddleware.js";
import globalErrorHandler from "./controllers/errorController.js";

// Express application setup
const app = express();

console.log("APP DB:", process.env.PG_DB);
console.log("APP PORT:", process.env.PORT);

// Midlleware
app.use(loggerMorganMiddleware);

// Route to handlers
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Health ok !",
  });
});

// Error handlers
// Not found routes
app.all("*", notFoundHandler);

app.use(globalErrorHandler);

export default app;
