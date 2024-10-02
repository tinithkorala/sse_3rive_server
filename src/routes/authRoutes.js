import express from "express";

import {
  authRefreshTokenSchema,
  authSignInSchema,
  authSignUpSchema,
} from "../validators/authValidator.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import {
  refreshToken,
  signIn,
  signUp,
} from "./../controllers/authController.js";

const router = express.Router();

router.post("/sign-up", validateMiddleware(authSignUpSchema), signUp);
router.post("/sign-in", validateMiddleware(authSignInSchema), signIn);
router.post(
  "/refresh-token",
  validateMiddleware(authRefreshTokenSchema),
  refreshToken
);

export default router;
