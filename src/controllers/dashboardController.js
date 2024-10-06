import { getAllTasksPriorityWise, getAllTasksStatusWise } from "../services/dashboardService.js";
import catchAsync from "../util/catchAsync.js";

export const getDashboardStats = catchAsync(async (req, res, next) => {
  const allTasksStatusWise = await getAllTasksStatusWise(req.user.id, req.query);
  const allTasksPriorityWise = await getAllTasksPriorityWise(req.user.id, req.query);
  if (allTasksStatusWise) {
    res.status(200).json({
      status: "success",
      message: "Dashboard stats fetched successfully!",
      data: {
        allTasksStatusWise,
        allTasksPriorityWise
      },
    });
  }
});
