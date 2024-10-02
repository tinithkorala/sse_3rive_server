import "dotenv/config";

import app from "./app.js";

// Server configuration
const PORT = process.env.PORT || 5000;

console.log("SERVER_DB:", process.env.PG_DB);
console.log("SERVER_PORT:", process.env.PORT);

// Server Listen
app.listen(PORT, () => {
  // logger.info(`Server is running on port ${PORT}`)
  console.log(`Server is running on port ${PORT}`)
});