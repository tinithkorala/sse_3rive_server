import Task from "../models/Task.js";

export const create = async (bodyData, userId) => {
  try {
    const task = Task.create({ ...bodyData, user_id: userId });
    return task;
  } catch (error) {
    throw error;
  }
};
