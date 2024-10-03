import {
  create,
  getSingleTaskByUserId,
  getTasksByUserId,
} from "../services/taskService.js";
import catchAsync from "../util/catchAsync.js";

export const getTasks = catchAsync(async (req, res, next) => {
  const response = await getTasksByUserId(req.user.id);
  if (response) {
    res.status(201).json({
      status: "Success",
      message: "Tasks fetch successfully!",
      results: response.length,
      data: {
        task: response,
      },
    });
  }
});

export const createTask = catchAsync(async (req, res, next) => {
  const response = await create(req.body, req.user.id);
  if (response) {
    res.status(201).json({
      status: "Success",
      message: "Task created successfully!",
      data: {
        tasks: response,
      },
    });
  }
});

export const getTask = catchAsync(async (req, res, next) => {
  const response = await getSingleTaskByUserId(req.params.id, req.user.id);
  if (response) {
    res.status(200).json({
      status: "Success",
      message: "Task fetch successfully!",
      results: response.length,
      data: {
        tasks: response,
      },
    });
  }
});
