import express from "express";
import {
  createExpensesTransaction,
  createIncomeTransaction,
  summary,
  allIncomeTrxn,
  allExpensesTrxn,
} from "../controllers/transactionCtrl.js";

const transactionRouter = express.Router();

transactionRouter.get("/summary", summary);
transactionRouter.post("/income", createIncomeTransaction);
transactionRouter.post("/expenses", createExpensesTransaction);
transactionRouter.get("/all-income", allIncomeTrxn);
transactionRouter.get("/all-expenses", allExpensesTrxn);
export default transactionRouter;
