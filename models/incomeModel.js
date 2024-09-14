import mongoose from "mongoose";

const { Schema } = mongoose;
const IncomeSchema = new Schema(
  {
    userProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
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
    },
    description: {
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

const Income = new mongoose.model("Income", IncomeSchema);

export default Income;
