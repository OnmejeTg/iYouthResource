import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  verifyEmail,
  loggedInUser,
  emailSub,
  contact,
} from "../controllers/userCtrl.js";
import {
  userValidationRules,
  validateUser,
} from "../validators/userValidator.js";
import { isLoggedin } from "../middlewares/auth.js";
import { memoryupload } from "../utils/multer.js";

const userRouter = express.Router();

userRouter.post("/", userValidationRules, validateUser, createUser); // POST /users
userRouter.get("/", getUsers); // GET /users
userRouter.post("/verify", verifyEmail);
userRouter.get("/@me", isLoggedin, loggedInUser); // Use this to get the logged in user for jwt authentication
// userRouter.get("/logged-in-user", loggedInUser); //Use this to get the logged in user for session authentication
userRouter.get("/:id", isLoggedin, getUser); // GET /users/:id
userRouter.put("/", isLoggedin, memoryupload.single("file"), updateUser); // PUT /users/:id
userRouter.delete("/:id", deleteUser); // DELETE /users/:id
userRouter.post("/email-sub", emailSub);
userRouter.post("/contact", contact);

export default userRouter;
