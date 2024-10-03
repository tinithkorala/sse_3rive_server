import { create } from "../services/taskService.js";
import catchAsync from "../util/catchAsync.js";

export const createTask = catchAsync(async (req, res, next) => {
  const response = await create(req.body, req.user.id);
  if (response) {
    res.status(201).json({
      status: "Success",
      message: "Task created successfully!",
      data: {
        task: response,
      },
    });
  }
});
