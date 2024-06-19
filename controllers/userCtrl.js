import asyncHandler from "express-async-handler";
import User from "../models/users.js";
import _ from "lodash";

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
    const sanitizedData = _.pick(user, ["_id", "email"]);
    return res.status(201).send({
      status: "Success",
      message: "User created successfully",
      data: sanitizedData,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

export const getUser = asyncHandler(async (req, res) => {
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
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    const sanitizedUser = sanitizeUser(updatedUser);
    return res.status(200).send({
      status: "Success",
      message: "User updated successfully",
      data: sanitizedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.findByIdAndDelete(id);
    return res.status(200).send({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
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
