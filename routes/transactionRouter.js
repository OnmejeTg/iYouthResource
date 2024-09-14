import express from "express";
import { summary } from "../controllers/transactionCtrl.js";

const transactionRouter = express.Router();

transactionRouter.get("/summary", summary);

export default transactionRouter;
