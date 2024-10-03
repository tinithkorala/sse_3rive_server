import express from "express";
import { createTask } from "../controllers/taskController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { taskCreateSchema } from "../validators/taskValidator.js";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router.use(validateMiddleware(taskCreateSchema));

router.route("/").get().post(protectMiddleware, createTask);

export default router;
