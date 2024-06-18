import asyncHandler from "express-async-handler";

export const test = asyncHandler(async (req, res) => {
    res.send("test")
})