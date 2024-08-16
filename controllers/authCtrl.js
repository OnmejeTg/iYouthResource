import User from "../models/users.js";
import asyncHandler from "express-async-handler";
import { generateAccessToken, generateRefreshToken } from "../utils/authUtils.js";

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ email: username });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    if(user.isVerified == false) {
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
      username: user.email
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
  return res.send("Forgot password...");
});

export const verifyEmail = asyncHandler(async (req, res) => {
  return res.send("Verifying email...");
});
