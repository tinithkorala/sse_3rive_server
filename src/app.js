import express from "express";
import hpp from "hpp";
import cors from "cors";

import loggerMorganMiddleware from "./middleware/loggerMorganMiddleware.js";
import notFoundHandler from "./middleware/notFoundMiddleware.js";
import globalErrorHandler from "./controllers/errorController.js";
import authRouter from "./routes/authRoutes.js";
import taskRouter from "./routes/taskRoutes.js";
import rateLimiterMiddleware from "./middleware/rateLimiterMiddleware.js";
import { corsConfig } from "./config/corsConfig.js";

// Express application setup
const app = express();

console.log("APP DB:", process.env.PG_DB);
console.log("APP PORT:", process.env.PORT);

// Midlleware
app.use(cors(corsConfig));
app.use(
  express.json({
    limit: "100kb",
  })
);
app.use(loggerMorganMiddleware);
app.use("/api", rateLimiterMiddleware);
app.use(hpp());

// Route to handlers
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Health ok !",
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tasks", taskRouter);

// Error handlers
// Not found routes
app.all("*", notFoundHandler);

app.use(globalErrorHandler);

export default app;
