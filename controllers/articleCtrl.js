import Article from "../models/ArticleModel.js";

// const sanitizeArticle = (article) => {
//   const articleObj = article.toObject();
//   return _.omit(articleObj, ["content"]);
// };

export const createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json(article);
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
