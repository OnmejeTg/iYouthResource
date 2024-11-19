import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import _ from "lodash";
import otpGenerator from "otp-generator";
import OTP from "../models/otp.js";
import { sendEmail, sendSuccessRegEmail } from "../utils/email.js";
import Profile from "../models/profile.js";

const sanitizeUser = (agent) => {
  const agentObj = agent.toObject();
  return _.omit(agentObj, ["password"]);
};

export const createUser = asyncHandler(async (req, res) => {
  const reqdata = req.body;
  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email: reqdata.email });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use" });
    }

    // Create a new user
    const user = new User(reqdata);
    await user.save();
    //Send otp
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
      type: "emailVerification",
      expiresIn: otpExpirationTime,
    });

    await otp.save();
    // Send email with OTP
    const sentMail = await sendEmail(user.email, code);
    if (sentMail) {
      console.log("Mail sent:", sentMail);
      const sanitizedData = _.pick(user, ["_id", "email"]);
      return res.status(201).send({
        status: "success",
        message: "User created successfully and email sent successfully",
        data: sanitizedData,
      });
    }
    console.log("Mail sent:", false);
    const sanitizedData = _.pick(user, ["_id", "email"]);
    return res.status(201).send({
      status: "success",
      message: "User created successfully but email not sent successfully",
      data: sanitizedData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

export const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).send({ status: false, message: "User not found" });
    }
    const otpData = await OTP.findOne({
      email: email.toLowerCase().trim(),
      code: otp,
      type: "emailVerification",
      isValid: true,
    });

    if (!otpData || otpData.expiresIn < new Date()) {
      return res.status(404).send({ status: false, message: "Invalid OTP" });
    }
    user.isVerified = true;
    await user.save();

    const userProfile = new Profile({
      user: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });
    userProfile.save();

    await otpData.deleteOne();
    sendSuccessRegEmail(email);
    return res.status(200).json({
      success: true,
      message: "Account verified successful",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

export const getUser = asyncHandler(async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const sanitizedUser = sanitizeUser(user);
  return res.status(200).send({
    status: "Success",
    message: "User fetched successfully",
    data: sanitizedUser,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorised" });
  }
  console.log(req.user);
  const profile = await Profile.findOne({ user: req.user.id });
  if (!profile) {
    return res.status(404).send({ message: "User profile not found" });
  }
  try {
    const updatedUserProfile = await Profile.findByIdAndUpdate(
      profile._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    // const sanitizedUser = sanitizeUser(updatedUserProfile);
    return res.status(200).send({
      status: "Success",
      message: "User updated successfully",
      data: updatedUserProfile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the user by ID
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  // Find and delete the user's profile
  const userProfile = await Profile.findOne({ user: user._id });
  if (userProfile) {
    await userProfile.deleteOne();
  }

  // Delete the user after profile deletion
  await User.findByIdAndDelete(id);

  // Send success response
  return res.status(200).send({
    status: "Success",
    message: "User and profile deleted successfully",
  });
});

export const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    const sanitizedUser = users.map((user) => sanitizeUser(user));
    return res.status(200).send({
      status: "Success",
      message: "Users fetched successfully",
      data: sanitizedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

export const loggedInUser = asyncHandler(async (req, res) => {
  // console.log("Logged in user", req.user);
  if (!req.user) {
    return res.status(401).send({ message: "User not logged in" });
  }
  const user = await User.findOne({ _id: req.user.id });
  const sanitizedUser = sanitizeUser(user);
  return res.status(200).send({
    status: "Success",
    message: "User fetched successfully",
    data: sanitizedUser,
  });
});
