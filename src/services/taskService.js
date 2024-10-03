import Task from "../models/Task.js";

export const getTasksByUserId = async (id) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: id } });
    return tasks;
  } catch ({ error }) {
    throw error;
  }
};

export const create = async (bodyData, userId) => {
  try {
    const task = Task.create({ ...bodyData, user_id: userId });
    return task;
  } catch (error) {
    throw error;
  }
};
