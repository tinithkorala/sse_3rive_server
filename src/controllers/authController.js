import { register } from "../services/authService.js";

export const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const response = await register(req.body);
    if (response) {
      const { user, accessToken, refreshToken } = response;
      res
        .status(200)
        .json({
          message: "success",
          data: { user, accessToken, refreshToken },
        });
    }
  } catch (error) {
    next(error);
  }
};
