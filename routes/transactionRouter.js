import express from "express";
import {
  createExpensesTransaction,
  createIncomeTransaction,
  summary,
} from "../controllers/transactionCtrl.js";

const transactionRouter = express.Router();

transactionRouter.get("/summary", summary);
transactionRouter.post("/income", createIncomeTransaction);
transactionRouter.post("/expenses", createExpensesTransaction);

export default transactionRouter;
