import Article from "../models/ArticleModel.js";

// const sanitizeArticle = (article) => {
//   const articleObj = article.toObject();
//   return _.omit(articleObj, ["content"]);
// };

export const createArticle = async (req, res) => {
  try {
    // Extract data from request body
    const { title, content, link } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required." });
    }

    // Handle file (if a file is uploaded)
    const thumbnail = req.file ? req.file.path : null;

    // Create the article
    const article = await Article.create({
      title,
      content,
      link,
      thumbnail,
    });

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
  const article = await Article.findByIdAndDelete(req.params.id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  res.json({ message: "Article deleted successfully" });

  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Error deleting article" });
  }
};

// Get all articles
export const getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};
