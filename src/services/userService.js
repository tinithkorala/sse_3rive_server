import { unauthorized } from "../config/errorConfig.js";
import User from "../models/User.js";
import AppError from "../util/appError.js";

export const findUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password", "isActive", "updatedAt", "createdAt"],
      },
    });
    if (!user) {
      const { name, code } = unauthorized;
      throw new AppError(
        name,
        "The user belonging to this token does no longer exist!",
        code
      );
    }
    return user;
  } catch (error) {
    throw error;
  }
};
