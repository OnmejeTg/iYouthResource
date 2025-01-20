import express from "express";
import {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
} from "../controllers/MentorCtrl.js";
import { memoryupload } from "../utils/multer.js";

const mentorRouter = express.Router();

mentorRouter.post(
  "/",
  memoryupload.fields([{ name: "profileImg", maxCount: 1 }]),
  createMentor
);
mentorRouter.get("/", getAllMentors);
mentorRouter.get("/:id", getMentorById);
mentorRouter.put(
  "/:id",
  memoryupload.fields([{ name: "profileImg", maxCount: 1 }]),
  updateMentor
);
mentorRouter.delete("/:id", deleteMentor);

export default mentorRouter;
