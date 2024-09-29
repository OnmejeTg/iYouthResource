import User from "../models/users.js";
import asyncHandler from "express-async-handler";
import { sendPassWordResetEmail } from "../utils/email.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateForgotPasswordToken,
} from "../utils/authUtils.js";
import passport from "passport";
import otpGenerator from "otp-generator";
import OTP from "../models/otp.js";

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
    const loggedInUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
    };

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   path: "/user/refresh_token",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: accessToken,
      user: loggedInUser,
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

// export const login = (req, res, next) => {
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ error: "Authentication failed", details: err });
//     }
//     if (!user) {
//       return res
//         .status(401)
//         .json({ error: "Invalid credentials", details: info });
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         return res.status(500).json({ error: "Login failed", details: err });
//       }
//       return res.status(200).json({ message: "Login successful" });
//     });
//   })(req, res, next);
// };

export const logout = asyncHandler(async (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorised" });
  // Log out the user
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed", details: err });
    }

    // Optionally destroy the session if using sessions
    req.session.destroy((err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Failed to destroy session", details: err });
      }

      // Send a success response
      return res.status(200).json({ message: "Logout successful" });
    });
  });
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
  // const token = generateForgotPasswordToken({
  //   userId: user.id,
  //   username: user.email,
  // });

  const code = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  const otpExpirationTime = new Date();
  otpExpirationTime.setMinutes(otpExpirationTime.getMinutes() + 15);

  const otp = new OTP({
    email: user.email,
    code,
    type: "forgotPassword",
    expiresIn: otpExpirationTime,
  });

  await otp.save();

  // Construct the reset link
  // const resetLink = `http://your-frontend-url.com/reset-password?token=${token}`;

  // Send the reset link via email
  try {
    const emailSent = await sendPassWordResetEmail(user.email, code);
    if (!emailSent) {
      throw new Error("Email sending failed");
    }
    return res.json({ message: "OTP has been sent to your email" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    return res.status(500).json({ message: "Error sending email" });
  }
});

export const verifyEmail = asyncHandler(async (req, res) => {
  // Route to handle resetting password

  const { otp, newPassword, email } = req.body;
  if (!otp || !newPassword || !email) {
    return res.status(400).send({
      message: "Please provide  an otp, a secure new password and email",
    });
  }
  try {
    const otpData = await OTP.findOne({
      email: email,
      code: otp,
      type: "forgotPassword",
      isValid: true,
    });

    if (!otpData || otpData.expiresIn < new Date()) {
      return res.status(404).send({ status: false, message: "Invalid OTP" });
    }
    const user = await User.findOne({ email });

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
