import jwt from "jsonwebtoken";

import { internalServerError } from "../config/errorConfig.js";

const { name, code } = internalServerError;

export const createAccessToken = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return accessToken;
  } catch (error) {
    throw new AppError(name, "Failed to create access token", code);
  }
};

export const createRefreshToken = (payload) => {
  try {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return refreshToken;
  } catch (error) {
    throw new AppError(name, "Failed to create refresh token", code);
  }
};
