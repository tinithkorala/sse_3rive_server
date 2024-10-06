import { Op } from "sequelize";
import Task from "../models/Task.js";
import sequelize from "../database/postgres.js";
import { TASK_PRIORITY, TASK_STATUS } from "../config/enumConfig.js";

export const getAllTasksStatusWise = async (userId, query) => {
  try {
    const { filter } = query;

    const whereCondition = {
      user_id: userId,
    };

    if (filter === "TODAY") {
      whereCondition.createdAt = {
        [Op.gte]: new Date().setHours(0, 0, 0, 0),
      };
    } else if (filter === "THIS_MONTH") {
      whereCondition.createdAt = {
        [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      };
    } else if (filter === "THIS_YEAR") {
      whereCondition.createdAt = {
        [Op.gte]: new Date(new Date().getFullYear(), 0, 1),
      };
    }

    const tasks = await Task.findAll({
      where: whereCondition,
      attributes: [
        "status",
        [sequelize.fn("COUNT", sequelize.col("id")), "task_count"],
      ],
      group: ["status"],
    });

    const results = Object.values(TASK_STATUS).map(status => {
      const task = tasks.find(task => task.status === status);
      const taskCount = task ? parseInt(task.get('task_count'), 10) : 0;
      return { status, task_count: taskCount };
    });

    return results;
  } catch (error) {
    throw error;
  }
};

export const getAllTasksPriorityWise = async (userId, query) => {
  try {
    const { filter } = query;

    let queryStr = `
    SELECT 
      COUNT("id") AS "task_count", 
      "priority"
    FROM "tasks" AS "Task"
    WHERE "Task"."user_id" = :userId
    `;

    if (filter === "TODAY") {
      queryStr += ` AND "Task"."createdAt" >= CURRENT_DATE`;
    } else if (filter === "THIS_MONTH") {
      queryStr += ` AND "Task"."createdAt" >= DATE_TRUNC('month', CURRENT_DATE)`;
    } else if (filter === "THIS_YEAR") {
      queryStr += ` AND "Task"."createdAt" >= DATE_TRUNC('year', CURRENT_DATE)`;
    }

    queryStr += ` GROUP BY "priority"`;

    const tasks = await sequelize.query(queryStr, {
      replacements: { userId },
      type: sequelize.QueryTypes.SELECT,
    });
   
    const results = Object.values(TASK_PRIORITY).map(priority => {
      const task = tasks.find(task => task.priority === priority);
      const taskCount = task ? parseInt(task.task_count, 10) : 0;

      return { priority, task_count: taskCount };
    });

    return results;
  } catch (error) {
    throw error;
  }
};
