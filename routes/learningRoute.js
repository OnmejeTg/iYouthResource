// routes/learningRoutes.js
import express from "express";
import {
  getLearningResources,
  getLearningResource,
  addLearningResource,
  updateLearningResource,
  deleteLearningResource,
} from "../controllers/learningController.js";

// import { protect, authorize } from '../middlewares/auth.js'; // If you have auth middleware

const router = express.Router();

router.route("/").get(getLearningResources).post(addLearningResource); // Add protect/authorize if needed: .post(protect, authorize('admin'), addLearningResource);

router
  .route("/:id")
  .get(getLearningResource)
  .put(updateLearningResource) // Add protect/authorize if needed: .put(protect, authorize('admin'), updateLearningResource);
  .delete(deleteLearningResource); // Add protect/authorize if needed: .delete(protect, authorize('admin'), deleteLearningResource);

export default router;
