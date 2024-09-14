import mongoose from "mongoose";

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
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
});

const Profile = new mongoose.model("Profile", profileSchema);

export default Profile;
