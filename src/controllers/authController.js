import { unauthorized } from "../config/errorConfig.js";
import { register, login } from "../services/authService.js";
import { findUserById } from "../services/userService.js";
import catchAsync from "../util/catchAsync.js";
import { createAccessToken, createRefreshToken, verifyToken } from "../util/token.js";

const createAndSendTokens = (user, statusCode, res, messageText) => {
  const accessToken = createAccessToken({ id: user.id, role: user.role });
  const refreshToken = createRefreshToken({ id: user.id, role: user.role });

  res.status(statusCode).json({
    status: "success",
    message: `${messageText} successfully!`,
    data: { user, accessToken, refreshToken },
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  const response = await register(req.body);
  if (response) {
    createAndSendTokens(response.user, 201, res, "SignUp");
  }
});

export const signIn = catchAsync(async (req, res, next) => {
  const response = await login(req.body);
  if (response) {
    createAndSendTokens(response.user, 200, res, "SignIn");
  }
});

export const refreshToken = catchAsync(async (req, res, next) => {
  const { name, code } = unauthorized;
  const { refresh_token } = req.body;

  const decode = await verifyToken(refresh_token, process.env.REFRESH_TOKEN_SECRET);

  if (!decode) {
    return next(new AppError(name, "Token is not validated!", code));
  }

  const currentUser = await findUserById(decode.id);

  const accessToken = createAccessToken({
    id: currentUser.id,
    role: currentUser.role,
  });

  res.status(200).json({
    status: "success",
    message: `Access token generated successfully!`,
    data: { accessToken },
  });
});
