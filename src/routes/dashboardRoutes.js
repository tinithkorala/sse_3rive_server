import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import protectMiddleware from "../middleware/protectMiddleware.js";

const router = express.Router();

router.use(protectMiddleware);

router.route("/").get(getDashboardStats);

export default router;
