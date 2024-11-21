import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  business: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/tgod/image/upload/v1732013818/IYR/default_ybxafb.webp",
  },
});

const Profile = new mongoose.model("Profile", profileSchema);

export default Profile;
