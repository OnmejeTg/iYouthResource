import Expenses from "../models/expensesModel.js";
import Income from "../models/incomeModel.js";

export const summary = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Set time to 00:00:00 for the beginning of the day

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Set time to 23:59:59 for the end of the day

    // Find income transactions within today's date range
    const incomeTrxn = await Income.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    // Find expenses transactions within today's date range
    const expensesTrxn = await Expenses.find({
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    // Calculate the total income
    const incomeAmount = incomeTrxn.reduce(
      (total, income) => total + income.amount,
      0
    );

    // Calculate the total expenses
    const expensesAmount = expensesTrxn.reduce(
      (total, income) => total + income.amount,
      0
    );

    // Send response with the total summary
    return res
      .status(200)
      .send({ income: incomeAmount, expenses: expensesAmount });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
