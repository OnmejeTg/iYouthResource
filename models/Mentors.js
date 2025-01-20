import mongoose from "mongoose";

const { Schema } = mongoose;
const MentorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: String,
    facebook: String,
    twitter: String,
    instagram: String,
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/tgod/image/upload/v1732013818/IYR/default_ybxafb.webp",
    },
  },
  { timestamps: true }
);

const Mentor = new mongoose.model("Mentor", MentorSchema);

export default Mentor;
