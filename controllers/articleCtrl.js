import Article from "../models/ArticleModel.js";
import mongoose from "mongoose";
import { uploadImage } from "../utils/cloudinary.js";
// const sanitizeArticle = (article) => {
//   const articleObj = article.toObject();
//   return _.omit(articleObj, ["content"]);
// };

export const createArticle = async (req, res) => {
  try {
    
    // Validate required fields
    if (!req.body.title || !req.body.content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    const imageBuffer = req.file?.buffer;
    
    let thumbnail = ""; // Retain current image by default

    if (imageBuffer) {
      const folder = "IYR/article/";
      // Upload the new image
      thumbnail = await uploadImage(imageBuffer, folder);
      req.body.thumbnail = thumbnail;
    }

    // Create the article
    const article = await Article.create(req.body);

    // Return success response
    return res
      .status(201)
      .json({ message: "Article created successfully", article });
  } catch (error) {
    console.error("Error creating article:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json(article);
};

export const updateArticle = async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID format" });
    }

    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Consider adding cleanup operations for related resources here
    // Example: delete associated thumbnail file from storage

    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.error("Error deleting article:", error);

    return res.status(500).json({
      success: false,
      message:
        process.env.NODE_ENV === "production"
          ? "Internal server error"
          : error.message,
    });
  }
};

// Get all articles
export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};
