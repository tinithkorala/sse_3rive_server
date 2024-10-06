import {
  createByUserId,
  updateByUserId,
  getTaskByUserId,
  getTasksByUserId,
  deleteByUserId,
} from "../services/taskService.js";
import catchAsync from "../util/catchAsync.js";

export const getTasks = catchAsync(async (req, res, next) => {
  const response = await getTasksByUserId(req.user.id, req.query);
  if (response) {
    const {tasks, totalResults, totalPages, page} = response;
    
    res.status(201).json({
      status: "success",
      message: "Tasks fetch successfully!",
      results: tasks.length,
      totalResults,
      totalPages,
      page,
      data: {
        tasks,
      },
    });
  }
});

export const createTask = catchAsync(async (req, res, next) => {
  const response = await createByUserId(req.body, req.user.id);
  if (response) {
    res.status(201).json({
      status: "success",
      message: "Task created successfully!",
      data: {
        task: response,
      },
    });
  }
});

export const getTask = catchAsync(async (req, res, next) => {
  const response = await getTaskByUserId(req.params.id, req.user.id);
  if (response) {
    res.status(200).json({
      status: "success",
      message: "Task fetched successfully!",
      results: response.length,
      data: {
        tasks: response,
      },
    });
  }
});

export const updateTask = catchAsync(async (req, res, next) => {
  const response = await updateByUserId(req.body, req.params.id, req.user.id);
  if (response) {
    res.status(200).json({
      status: "success",
      message: "Task updated successfully!",
      results: response.length,
      data: {
        tasks: response,
      },
    });
  }
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const response = await deleteByUserId(req.params.id, req.user.id)
  if (response) {
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully!",
    });
  }
})
