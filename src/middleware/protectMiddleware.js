import { unauthorized } from "../config/errorConfig";
import { findUserById } from "../services/userService";
import AppError from "../util/appError";
import { verifyToken } from "../util/token";

const protectMiddleware = async (req, res, next) => {
  const { name, code } = unauthorized;
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(name, "Access token missing or invalid!", code));
  }

  const accessToken = authHeader.split(" ")[1];

  const decode = verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET);

  if (!decode) {
    return next(new AppError(name, "Token is not validated!", code));
  }

  const currentUser = await findUserById(decode.id);

  if (!currentUser) {
    return next(
      new AppError(
        name,
        "The user belonging to this token does no longer exist!",
        code
      )
    );
  }

  req.user = currentUser;
  next();
};

export default protectMiddleware;