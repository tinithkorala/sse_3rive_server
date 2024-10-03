import express from "express";
import {
  createTask,
  getTask,
  getTasks,
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

router.route("/:id").get(getTask).patch().delete();

export default router;
