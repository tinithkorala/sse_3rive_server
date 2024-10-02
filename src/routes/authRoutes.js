import express from "express";

import { authSignUpSchema } from "../validators/authValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";

const router = express.Router();

router.post("/sign-up", validateMiddleware(authSignUpSchema), (req, res) => {
  res.status(200).json({ message: "data" });
});

export default router;
