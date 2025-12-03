import express from "express";
import {
  createExpensesTransaction,
  createIncomeTransaction,
  summary,
  allIncomeTrxn,
  allExpensesTrxn,
} from "../controllers/transactionCtrl.js";
import { memoryupload } from "../utils/multer.js";

const transactionRouter = express.Router();

transactionRouter.get("/summary", summary);
transactionRouter.post(
  "/income",
  memoryupload.fields([{ name: "photo", maxCount: 1 }]),
  createIncomeTransaction
);
transactionRouter.post(
  "/expenses",
  memoryupload.fields([{ name: "photo", maxCount: 1 }]),
  createExpensesTransaction
);
transactionRouter.get("/all-income", allIncomeTrxn);
transactionRouter.get("/all-expenses", allExpensesTrxn);
export default transactionRouter;
