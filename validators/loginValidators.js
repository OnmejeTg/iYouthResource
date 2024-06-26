import { body, validationResult } from "express-validator";

export const loginValidationRules = [
  body("username").trim().toLowerCase().isEmail().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

export const validateLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};
