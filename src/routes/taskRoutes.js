import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import validateMiddleware from "../middleware/validateMiddleware.js";
import { taskCreateSchema } from "../validators/taskValidator.js";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router.use(protectMiddleware);

router
  .route("/")
  .get(getTasks)
  .post(validateMiddleware(taskCreateSchema), createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
