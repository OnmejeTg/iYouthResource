import express from "express";
import { IncomeTax } from "../controllers/taxCtrl.js";

const taxRouter = express.Router();

taxRouter.get("/income-tax", IncomeTax); // GET /income-tax/:amount

export default taxRouter;
