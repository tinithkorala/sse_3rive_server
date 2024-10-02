import { badRequest } from "../config/errorConfig.js";
import User from "../models/User.js";
import AppError from "../util/appError.js";

export const register = async (data) => {
  try {
    // Check Duplicates
    const duplicates = await User.findOne({ where: { email: data.email } });

    if (duplicates) {
      const { name, code } = badRequest;
      throw new AppError(name, "Email is already registered", code);
    }

    const user = await User.create(data);

    return user;
  } catch (error) {
    throw error;
  }
};

// const authService = {
//   createUser:
// }
