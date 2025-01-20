import mongoose from "mongoose";

const { Schema } = mongoose;
const WorkshopSchema = new Schema(
  {
    link: String,
    tagline: String,
    thumbnail: {
      type: String,
      default:
        "https://res.cloudinary.com/tgod/image/upload/v1737387454/IYR/OIP_1_zw3x9s.jpg",
    },
  },
  { timestamps: true }
);

const Workshop = new mongoose.model("Workshop", WorkshopSchema);

export default Workshop;
