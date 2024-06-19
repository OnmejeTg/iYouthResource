import User from "../models/users.js";
import asyncHandler from "express-async-handler";


export const createUser = asyncHandler(async (req, res) => {
    const user = await User.create(req.body);
    res.status(201).json(user);
})