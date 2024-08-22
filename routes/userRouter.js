import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  verifyEmail,
  loggedInUser,
} from "../controllers/userCtrl.js";
import {
  userValidationRules,
  validateUser,
} from "../validators/userValidator.js";
import { isLoggedin } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/", userValidationRules, validateUser, createUser); // POST /users
userRouter.get("/", getUsers); // GET /users
userRouter.post("/verify", verifyEmail); // GET /users
userRouter.get("/logged-in-user", isLoggedin, loggedInUser); // GET /users
userRouter.get("/:id", getUser); // GET /users/:id
userRouter.put("/:id", updateUser); // PUT /users/:id
userRouter.delete("/:id", deleteUser); // DELETE /users/:id

export default userRouter;
