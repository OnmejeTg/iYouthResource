import express from "express";
import {
  login,
  logout,
  forgotPassword,
  verifyEmail,
  refreshAccessToken,
  resendOtp,
} from "../controllers/authCtrl.js";
import {
  loginValidationRules,
  validateLogin,
} from "../validators/loginValidators.js";


export const authRouter = express.Router();

authRouter.post("/login", loginValidationRules, validateLogin, login);
authRouter.post("/refresh-token", refreshAccessToken);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password-email", forgotPassword);
authRouter.post("/forgot-password-verify", verifyEmail);
authRouter.post("/resend-otp", resendOtp);
