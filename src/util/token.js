import jwt from "jsonwebtoken";

import { internalServerError } from "../config/errorConfig.js";
import AppError from "./appError.js";

const { name, code } = internalServerError;

export const createAccessToken = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    return accessToken;
  } catch (error) {
    throw new AppError(name, "Failed to create access token", code);
  }
};

export const createRefreshToken = (payload) => {
  try {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    return refreshToken;
  } catch (error) {
    throw new AppError(name, "Failed to create refresh token", code);
  }
};

export const verifyToken = (token, secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(new AppError(err.name, "Token is invalid or expired", 401));
      }
      resolve(decoded);
    });
  });
};
