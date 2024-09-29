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
      userProfile: req.user.id,
      date: { $gte: startOfDay, $lt: endOfDay },
    });

    // Find expenses transactions within today's date range
    const expensesTrxn = await Expenses.find({
      userProfile: req.user.id,
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

export const createIncomeTransaction = async (req, res) => {
  try {
    const { date, amount, category, description, paymentMethod, photo } =
      req.body;

    // Validate required fields
    if (!date || !amount || !category) {
      return res.status(400).json({
        message: "Please provide date, amount, and category",
      });
    }

    // Parse and validate the input date
    const inputDate = new Date(date.replace(":", "T"));
    const now = new Date();

    if (isNaN(inputDate)) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    if (inputDate >= now) {
      return res.status(400).json({
        message: "Cannot add transaction to a future date",
      });
    }

    // Create a new income transaction
    const income = new Income({
      userProfile: req.user.id, // Assuming req.user.id contains the logged-in user's ID
      date: inputDate,
      amount,
      category,
      description,
      paymentMethod,
      photo,
    });

    // Save the transaction to the database
    await income.save();

    // Send success response
    return res.status(201).json({
      message: "Income added successfully!",
      data: income,
    });
  } catch (error) {
    console.error("Error creating income transaction:", error);
    return res.status(500).json({
      message: "An error occurred while adding income",
      error: error.message || "Internal Server Error",
    });
  }
};

export const createExpensesTransaction = async (req, res) => {
  const { date, amount, category, description, paymentMethod, photo } =
    req.body;

  // Validate required fields
  if (!date || !amount || !category) {
    return res.status(400).send({
      message: "Please provide date, amount, and category",
    });
  }
  // Parse and validate the input date
  const inputDate = new Date(date.replace(":", "T"));
  const now = new Date();

  if (isNaN(inputDate)) {
    return res.status(400).json({
      message: "Invalid date format",
    });
  }

  if (inputDate >= now) {
    return res.status(400).json({
      message: "Cannot add transaction to a future date",
    });
  }

  try {
    // Create a new expenses transaction
    const expenses = new Expenses({
      userProfile: req.user.id, // Assuming req.user._id contains the logged-in user's ID
      date,
      amount,
      category,
      description,
      paymentMethod,
      photo,
    });

    // Save the transaction to the database
    await expenses.save();

    // Send success response
    return res.status(201).send({
      message: "Expenses added successfully!",
      data: expenses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Something went wrong",
      error: error.message || "Internal Server Error",
    });
  }
};
