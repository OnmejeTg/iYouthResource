import express from "express";
import {
  createFunding,
  getFundings,
  getFundingById,
  updateFunding,
  deleteFunding,
  handlePublish,
} from "../controllers/fundingCtrl.js";
import { memoryupload } from "../utils/multer.js";

const fundingRouter = express.Router();

fundingRouter.post("/", memoryupload.single("file"), createFunding);
fundingRouter.get("/", getFundings);
fundingRouter.get("/:id", getFundingById);
fundingRouter.put("/:id", updateFunding);
fundingRouter.delete("/:id", deleteFunding);
fundingRouter.put("/:id/publish", handlePublish); // Endpoint to publish a funding

export default fundingRouter;
