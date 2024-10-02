import { badRequest, unauthorized } from "../config/errorConfig.js";
import User from "../models/User.js";
import AppError from "../util/appError.js";

export const register = async (bodyData) => {
  try {
    const { name, code } = badRequest;
    // Check Duplicates
    const duplicates = await User.findOne({ where: { email: bodyData.email } });

    if (duplicates) {
      throw new AppError(name, "Email is already registered", code);
    }

    const user = await User.create(bodyData);

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

export const login = async (bodyData) => {
  try {
    const { email, password: passwordText } = bodyData;

    const user = await User.findOne({
      where: { email },
    });

    if (!user || !(await user.isCorrectPassword(passwordText))) {
      const { name, code } = unauthorized;
      throw new AppError(name, "Incorrect email or password", code);
    }

    const { password, isActive, updatedAt, createdAt, ...restUser } = user.get({
      plain: true,
    });

    return { user: restUser };
  } catch (error) {
    throw error;
  }
};
