import express from "express";
import {
  createFunding,
  getFundings,
  getFundingById,
  updateFunding,
  deleteFunding,
} from "../controllers/fundingCtrl.js";

const fundingRouter = express.Router();

fundingRouter.post("/", createFunding);
fundingRouter.get("/", getFundings);
fundingRouter.get("/:id", getFundingById);
fundingRouter.put("/:id", updateFunding);
fundingRouter.delete("/:id", deleteFunding);

export default fundingRouter;
