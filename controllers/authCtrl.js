import User from "../models/users.js";
import asyncHandler from "express-async-handler";
import { sendPassWordResetEmail } from "../utils/email.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateForgotPasswordToken,
} from "../utils/authUtils.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if (user.isVerified == false) {
      return res.status(401).send({ message: "User not verified" });
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ status: "false", message: "Invalid email or password" });
    }
    const payLoad = {
      id: user._id,
      username: user.email,
    };

    const accessToken = generateAccessToken(payLoad);
    const refreshToken = generateRefreshToken(payLoad);
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   path: "/user/refresh_token",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: accessToken,
      // refreshToken: refreshToken,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      message: "An unexpected error occurred during login.",
    });
  }
});

export const logout = asyncHandler(async (req, res) => {
  return res.send("Loging out...");
});

export const resetPassword = asyncHandler(async (req, res) => {
  return res.send("Reseting password...");
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate a JWT token
  const token = generateForgotPasswordToken({
    userId: user.id,
    username: user.email,
  });

  // Construct the reset link
  const resetLink = `http://your-frontend-url.com/reset-password?token=${token}`;

  // Send the reset link via email
  try {
    const emailSent = await sendPassWordResetEmail(user.email, resetLink);
    if (!emailSent) {
      throw new Error("Email sending failed");
    }
    return res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({ message: "Error sending email" });
  }
});

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyEmail = asyncHandler(async (req, res) => {
  // Route to handle resetting password

  const { token, newPassword } = req.body;
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  try {
    // Verify the token
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const id = decoded.userId;
    
    const user = await User.findOne({ _id: id });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Update the user's password (you should hash it in a real app)
    user.password = newPassword;
    await user.save();

    return res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
});
