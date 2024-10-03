import express from "express";
import { createTask, getTasks } from "../controllers/taskController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { taskCreateSchema } from "../validators/taskValidator.js";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router.use(protectMiddleware);

router.route("/").get(getTasks).post(validateMiddleware(taskCreateSchema), createTask);

export default router;
