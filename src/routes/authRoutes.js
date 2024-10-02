import express from "express";

import { authSignInSchema, authSignUpSchema } from "../validators/authValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { signIn, signUp } from "./../controllers/authController.js"

const router = express.Router();

router.post("/sign-up", validateMiddleware(authSignUpSchema), signUp);
router.post("/sign-in", validateMiddleware(authSignInSchema), signIn);

export default router;
