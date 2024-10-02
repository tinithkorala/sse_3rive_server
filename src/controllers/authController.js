import { register } from "../services/authService.js";

export const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    // Register the user
    const ress = await register(req.body)
    res.status(200).json({ message: "data", data: ress });
  } catch (error) {
    next(error)
  }
};

