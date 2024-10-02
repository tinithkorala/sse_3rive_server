import express from "express";

import { authSignUpSchema } from "../validators/authValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { signUp } from "./../controllers/authController.js"

const router = express.Router();

router.post("/sign-up", validateMiddleware(authSignUpSchema), signUp);

export default router;
