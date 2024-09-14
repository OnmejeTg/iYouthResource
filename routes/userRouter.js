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
userRouter.post("/verify", verifyEmail);
userRouter.get("/@me", loggedInUser); // Use this to get the logged in user for jwt authentication
// userRouter.get("/logged-in-user", loggedInUser); //Use this to get the logged in user for session authentication
userRouter.get("/:id", getUser); // GET /users/:id
userRouter.put("/", updateUser); // PUT /users/:id
userRouter.delete("/:id", deleteUser); // DELETE /users/:id

export default userRouter;
