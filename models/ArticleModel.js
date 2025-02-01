import mongoose from "mongoose";

const { Schema } = mongoose;
const ArticleSchema = new Schema(
  {
    title: String,
    content: String,
    thumbnail: {
      type: String,
      default:
        "https://res.cloudinary.com/tgod/image/upload/v1737387454/IYR/OIP_1_zw3x9s.jpg",
    },
    link: String,
  },
  { timestamps: true }
);

const Article = new mongoose.model("Article", ArticleSchema);

export default Article;
