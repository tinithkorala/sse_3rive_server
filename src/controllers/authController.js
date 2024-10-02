import { register, login } from "../services/authService.js";
import catchAsync from "../util/catchAsync.js";
import { createAccessToken, createRefreshToken } from "../util/token.js";

const createAndSendTokens = (user, statusCode, res, messageText) => {
  const accessToken = createAccessToken({ id: user.id, role: user.role });
  const refreshToken = createRefreshToken({ id: user.id, role: user.role });

  res.status(statusCode).json({
    status: "success",
    message: `${messageText} Success!`,
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
})