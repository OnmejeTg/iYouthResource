import express from "express";
import {
  createWorkshop,
  getAllWorkshop,
  geWorkshopById,
  updateWorkshop,
  deleteworkshop,
} from "../controllers/workshopCtrl.js";
import { memoryupload } from "../utils/multer.js";

const workshopRouter = express.Router();

workshopRouter.post(
  "/",
  memoryupload.fields([{ name: "thumbnail", maxCount: 1 }]),
  createWorkshop
);
workshopRouter.get("/", getAllWorkshop);
workshopRouter.get("/:id", geWorkshopById);
workshopRouter.put(
  "/:id",
  memoryupload.fields([{ name: "thumbnail", maxCount: 1 }]),
  updateWorkshop
);
workshopRouter.delete("/:id", deleteworkshop);

export default workshopRouter;
