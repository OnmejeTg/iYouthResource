import LearningResource from "../models/LearningResource.js";

// controllers/learningController.js
// import { CustomError } from '../middlewares/errorHandling.js'; // If you have a custom error class

// @desc    Get all learning resources
// @route   GET /api/learning
// @access  Public (or Private if you add auth middleware)
export const getLearningResources = async (req, res, next) => {
  try {
    const resources = await LearningResource.find();
    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    // next(new CustomError(error.message, 500)); // Use custom error handler
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single learning resource
// @route   GET /api/learning/:id
// @access  Public (or Private if you add auth middleware)
export const getLearningResource = async (req, res, next) => {
  try {
    const resource = await LearningResource.findById(req.params.id);
    if (!resource) {
      // return next(new CustomError('Resource not found', 404)); // Use custom error handler
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }
    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    // next(new CustomError(error.message, 500)); // Use custom error handler
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Add new learning resource
// @route   POST /api/learning
// @access  Private (e.g., admin or authenticated user)
export const addLearningResource = async (req, res, next) => {
  try {
    // If you want to associate the resource with a user, uncomment this
    // req.body.user = req.user.id;
    const resource = await LearningResource.create(req.body);
    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      // return next(new CustomError(messages.join(', '), 400)); // Use custom error handler
      return res.status(400).json({ success: false, error: messages });
    } else {
      // next(new CustomError(error.message, 500)); // Use custom error handler
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// @desc    Update learning resource
// @route   PUT /api/learning/:id
// @access  Private (e.g., admin or authenticated user)
export const updateLearningResource = async (req, res, next) => {
  try {
    let resource = await LearningResource.findById(req.params.id);
    if (!resource) {
      // return next(new CustomError('Resource not found', 404)); // Use custom error handler
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }

    // Ensure user owns resource if not admin (uncomment if user-specific)
    // if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //     return next(new CustomError(`User ${req.user.id} is not authorized to update this resource`, 401));
    // }

    resource = await LearningResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on update
      }
    );
    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      // return next(new CustomError(messages.join(', '), 400)); // Use custom error handler
      return res.status(400).json({ success: false, error: messages });
    } else {
      // next(new CustomError(error.message, 500)); // Use custom error handler
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

// @desc    Delete learning resource
// @route   DELETE /api/learning/:id
// @access  Private (e.g., admin or authenticated user)
export const deleteLearningResource = async (req, res, next) => {
  try {
    const resource = await LearningResource.findById(req.params.id);
    if (!resource) {
      // return next(new CustomError('Resource not found', 404)); // Use custom error handler
      return res
        .status(404)
        .json({ success: false, error: "Resource not found" });
    }

    // Ensure user owns resource if not admin (uncomment if user-specific)
    // if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
    //     return next(new CustomError(`User ${req.user.id} is not authorized to delete this resource`, 401));
    // }

    await resource.deleteOne(); // Use deleteOne() for Mongoose 6+
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    // next(new CustomError(error.message, 500)); // Use custom error handler
    res.status(500).json({ success: false, error: error.message });
  }
};
