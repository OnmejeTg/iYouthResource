import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
    res.send("creating user");
})

export const getUser = asyncHandler(async (req, res) => {
    res.send("getting user");
})

export const updateUser = asyncHandler(async (req, res) => {
    res.send("updating user");
})

export const deleteUser = asyncHandler(async (req, res) => {
    res.send("deleting user");
})

export const getUsers = asyncHandler(async (req, res) => {
    res.send("getting users");
})