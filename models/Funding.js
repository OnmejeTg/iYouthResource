import mongoose from "mongoose";

const { Schema } = mongoose;
const FundingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    amount: String,
    eligibility: String,
    applicationDeadline: String,
    description: String,
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/tgod/image/upload/v1732051362/IYR/funding/image_30_1_zwbrdk.png",
    },
    applicationUrl: String,
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Funding = new mongoose.model("Funding", FundingSchema);

export default Funding;
