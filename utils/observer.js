import jwt from "jsonwebtoken";
import { errorMessage } from "./utils.js";
const JWT_SECRET = process.env.JWT_SECRET;

export const observer = async (req, res) => {
  const token = await req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return errorMessage(res, error);
  }
};
