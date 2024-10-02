import { badRequest } from "../config/errorConfig.js";
import User from "../models/User.js";
import AppError from "../util/appError.js";

export const register = async (data) => {
  try {
    const { name, code } = badRequest;
    // Check Duplicates
    const duplicates = await User.findOne({ where: { email: data.email } });

    if (duplicates) {
      throw new AppError(name, "Email is already registered", code);
    }

    const user = await User.create(data);

    if (!user) {
      throw new AppError(name, "Error when user created!", code);
    }

    const { password, isActive, updatedAt, createdAt, ...restUser } = user.get({
      plain: true,
    });

    return { user: restUser };
  } catch (error) {
    throw error;
  }
};
