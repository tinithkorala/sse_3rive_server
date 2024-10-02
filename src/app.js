import express from 'express';

// Express application setup
const app = express();

console.log('APP_DB:', process.env.PG_DB);
console.log('APP_PORT:', process.env.PORT);

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Health ok !",
  });
});

export default app;