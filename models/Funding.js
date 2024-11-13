import mongoose from "mongoose";

const { Schema } = mongoose;
const FundingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: Number,
    eligibility: String,
    applicationDeadline: Date,
    description: String,
    photo: String,
    applicationUrl: String,
  },
  { timestamps: true }
);

const Funding = new mongoose.model("Funding", FundingSchema);

export default Funding;
