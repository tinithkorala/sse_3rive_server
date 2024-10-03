import sequelize from "../database/postgres.js";

import User from "./User.js";
import Task from "./Task.js";

User.hasMany(Task, {
  foreignKey: "user_id",
  as: "tasks",
  onDelete: "CASCADE",
});

Task.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export default sequelize;
