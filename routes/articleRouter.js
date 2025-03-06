import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleCtrl.js";

import { memoryupload } from "../utils/multer.js";

const articleRouter = express.Router();

// GET all articles
articleRouter.get("/", getArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", memoryupload.single("thumbnail"), createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
