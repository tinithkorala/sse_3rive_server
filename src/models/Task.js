import { DataTypes, Sequelize } from "sequelize";
import sequelize from "../database/postgres.js";
import User from "./User.js";
import { TASK_PRIORITY, TASK_STATUS } from "../config/enumConfig.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title name cannot be empty.",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM(...Object.values(TASK_PRIORITY)),
      defaultValue: TASK_PRIORITY.LOW,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TASK_STATUS)),
      defaultValue: TASK_STATUS.PENDING,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    tableName: "tasks",
    indexes: [
      {
        fields: ["user_id", "priority"],
      },
      {
        fields: ["user_id", "status"],
      },
      {
        fields: ["user_id", "due_date"],
      },
    ],
  }
);

export default Task;
