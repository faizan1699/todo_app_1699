import jwt from "jsonwebtoken";
import { errorMessage } from "./utils.js";

export const middleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, please login again", status: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return errorMessage(res, error);
  }
};
