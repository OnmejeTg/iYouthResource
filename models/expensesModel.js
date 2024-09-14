import mongoose from "mongoose";

const { Schema } = mongoose;
const ExpensesSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Expenses = new mongoose.model("Expenses", ExpensesSchema);

export default Expenses;
