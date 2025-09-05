import mongoose from "mongoose";

const LearningResourceSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  link: {
    type: String,
    required: [true, "Please add a link"],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  category: {
    type: String,
    enum: ["article", "video", "tutorial", "documentation", "other"], // Example categories
    default: "article",
  },
  // Optional: Reference to a user if resources are user-specific
  // user: {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'User', // Assuming you have a 'User' model
  //     required: true
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update 'updatedAt' field on save and update
LearningResourceSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
LearningResourceSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});
LearningResourceSchema.pre("updateMany", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});
LearningResourceSchema.pre("updateOne", function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const LearningResource = mongoose.model(
  "LearningResource",
  LearningResourceSchema
);
export default LearningResource;
