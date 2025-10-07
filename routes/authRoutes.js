import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  resendVerificationLink,
  verifyUserEmailAccount,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post("/user/register", registerUser);
authRouter.post("/user/login", loginUser);
authRouter.post("/user/auth/logout", logoutUser);
authRouter.post(
  "/user/resend/email-verification-link/:email",
  resendVerificationLink
);
authRouter.post("/user/auth/verify-email/:token", verifyUserEmailAccount);

export default authRouter;
