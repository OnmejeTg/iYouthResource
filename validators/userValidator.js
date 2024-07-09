import { body, validationResult } from "express-validator";

export const userValidationRules = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),
  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ min: 2 })
    .withMessage("last name must be at least 2 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email is must be a valid"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .isMobilePhone()
    .withMessage("Phone is must be a valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password is must be at least 6 characters longF"),
];

export const validateUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
