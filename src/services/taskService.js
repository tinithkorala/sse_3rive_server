import { resourceNotFound } from "../config/errorConfig.js";
import Task from "../models/Task.js";
import AppError from "../util/appError.js";
import APIQueryBuilder from "../util/apiQueryBuilder.js";

export const getTasksByUserId = async (userId, query) => {
  try {
    const queryBuilder = new APIQueryBuilder(
      { where: { user_id: userId } },
      query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const { where, order, attributes, limit, offset, page } =
      queryBuilder.query;

    const tasks = await Task.findAll({
      where,
      order,
      attributes,
      limit,
      offset,
      page,
    });
    return tasks;
  } catch (error) {
    throw error;
  }
};

export const getTaskByUserId = async (taskId, userId) => {
  try {
    const task = await Task.findOne({
      where: { id: taskId, user_id: userId },
    });
    if (!task) {
      const { name, code } = resourceNotFound;
      throw new AppError(name, "No task found!", code);
    }
    return task;
  } catch (error) {
    throw error;
  }
};

export const createByUserId = async (bodyData, userId) => {
  try {
    const task = Task.create({ ...bodyData, user_id: userId });
    return task;
  } catch (error) {
    throw error;
  }
};

export const updateByUserId = async (bodyData, taskId, userId) => {
  try {
    const task = await Task.findOne({
      where: { id: taskId, user_id: userId },
    });
    if (!task) {
      const { name, code } = resourceNotFound;
      throw new AppError(name, "No task found with that ID!", code);
    }
    await task.update(bodyData);
    return task;
  } catch (error) {
    throw error;
  }
};

export const deleteByUserId = async (taskId, userId) => {
  try {
    const deleteTour = await Task.destroy({
      where: {
        id: taskId,
        user_id: userId,
      },
    });
    if (!deleteTour) {
      const { name, code } = resourceNotFound;
      throw new AppError(name, "No task found with that ID!", code);
    }
    return deleteTour;
  } catch (error) {
    throw error;
  }
};
