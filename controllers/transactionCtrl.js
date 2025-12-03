import Expenses from "../models/expensesModel.js";
import Income from "../models/incomeModel.js";
import { uploadImage } from "../utils/cloudinary.js";

export const summary = async (req, res) => {
  try {
    const { date, startDate, endDate } = req.query;

    const getDayBounds = (inputDate) => {
      const start = new Date(inputDate);
      const end = new Date(inputDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start, end };
    };

    let rangeStart;
    let rangeEnd;

    if (date) {
      const parsedDate = new Date(date);

      if (isNaN(parsedDate)) {
        return res.status(400).json({ message: "Invalid date provided" });
      }

      ({ start: rangeStart, end: rangeEnd } = getDayBounds(parsedDate));
    } else if (startDate || endDate) {
      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ message: "Please provide both startDate and endDate" });
      }

      const parsedStart = new Date(startDate);
      const parsedEnd = new Date(endDate);

      if (isNaN(parsedStart) || isNaN(parsedEnd)) {
        return res.status(400).json({ message: "Invalid date range provided" });
      }

      if (parsedStart > parsedEnd) {
        return res
          .status(400)
          .json({ message: "startDate cannot be later than endDate" });
      }

      rangeStart = new Date(parsedStart);
      rangeStart.setHours(0, 0, 0, 0);
      rangeEnd = new Date(parsedEnd);
      rangeEnd.setHours(23, 59, 59, 999);
    } else {
      ({ start: rangeStart, end: rangeEnd } = getDayBounds(new Date()));
    }

    // Fetch income and expenses concurrently for the requested window
    const [incomeTrxn, expensesTrxn] = await Promise.all([
      Income.find({
        userProfile: req.user.id,
        date: { $gte: rangeStart, $lte: rangeEnd },
      }),
      Expenses.find({
        userProfile: req.user.id,
        date: { $gte: rangeStart, $lte: rangeEnd },
      }),
    ]);

    const incomeAmount = incomeTrxn.reduce(
      (total, income) => total + income.amount,
      0
    );
    const expensesAmount = expensesTrxn.reduce(
      (total, expense) => total + expense.amount,
      0
    );

    return res.status(200).json({
      range: {
        start: rangeStart.toISOString(),
        end: rangeEnd.toISOString(),
      },
      income: incomeAmount,
      expenses: expensesAmount,
      incomeTransactions: incomeTrxn,
      expensesTransactions: expensesTrxn,
    });
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

    // Upload photo if provided (file or existing URL)
    const photoFile = req.files?.photo?.[0];
    const folder = "IYR/transactions/income";
    let photoUrl = photo || "";

    if (photoFile?.buffer) {
      photoUrl = await uploadImage(photoFile.buffer, folder);
    }

    // Create a new income transaction
    const income = new Income({
      userProfile: req.user.id, // Assuming req.user.id contains the logged-in user's ID
      date: inputDate,
      amount,
      category,
      description,
      paymentMethod,
      photo: photoUrl,
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
    const photoFile = req.files?.photo?.[0];
    const folder = "IYR/transactions/expenses";
    let photoUrl = photo || "";

    if (photoFile?.buffer) {
      photoUrl = await uploadImage(photoFile.buffer, folder);
    }

    // Create a new expenses transaction
    const expenses = new Expenses({
      userProfile: req.user.id, // Assuming req.user._id contains the logged-in user's ID
      date: inputDate,
      amount,
      category,
      description,
      paymentMethod,
      photo: photoUrl,
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

export const allIncomeTrxn = async (req, res) => {
  try {
    // Fetch all income transactions for the logged-in user
    const allTrxn = await Income.find({ userProfile: req.user.id });

    if (!allTrxn.length) {
      return res.status(404).json({
        message: "No income transactions found",
      });
    }

    return res.status(200).json({
      message: "Income transactions retrieved successfully",
      data: allTrxn,
    });
  } catch (error) {
    console.error("Error retrieving income transactions:", error.message);
    return res.status(500).json({
      message: "An error occurred while retrieving income transactions",
      error: error.message || "Internal Server Error",
    });
  }
};

export const allExpensesTrxn = async (req, res) => {
  try {
    // Fetch all income transactions for the logged-in user
    const allTrxn = await Expenses.find({ userProfile: req.user.id });

    if (!allTrxn.length) {
      return res.status(404).json({
        message: "No income transactions found",
      });
    }

    return res.status(200).json({
      message: "Income transactions retrieved successfully",
      data: allTrxn,
    });
  } catch (error) {
    console.error("Error retrieving income transactions:", error.message);
    return res.status(500).json({
      message: "An error occurred while retrieving income transactions",
      error: error.message || "Internal Server Error",
    });
  }
};
