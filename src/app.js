import express from 'express';

import loggerMorganMiddleware from './middleware/loggerMorganMiddleware.js';

// Express application setup
const app = express();

console.log('APP DB:', process.env.PG_DB);
console.log('APP PORT:', process.env.PORT);

// Midlleware
app.use(loggerMorganMiddleware)

// Route to handlers
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Health ok !",
  });
});

export default app;