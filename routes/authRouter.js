import express from "express";
import {
  resetPassword,
  login,
  logout,
  forgotPassword,
  verifyEmail,
} from "../controllers/authCtrl.js";
import { loginValidationRules, validateLogin } from "../validators/loginValidators.js";


export const authRouter = express.Router();

authRouter.post("/login", loginValidationRules, validateLogin,  login);
