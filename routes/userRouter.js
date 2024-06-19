import express from "express";
import {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userCtrl.js";


const userRouter = express.Router();

userRouter.post("/", createUser);            // POST /users
userRouter.get("/:id", getUser);             // GET /users/:id
userRouter.put("/:id", updateUser);          // PUT /users/:id
userRouter.delete("/:id", deleteUser);       // DELETE /users/:id
userRouter.get("/", getUsers);               // GET /users


export default userRouter;
