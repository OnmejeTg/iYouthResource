import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_EXPIRATION_TIME = '1h';
const isValidUserData = (userData) => {
  return userData && userData.username && userData.password;
};
//TODO: Add expiresIn value before production
const generateAccessToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.ACCESS_TOKEN_SECRET);
};

const generateRefreshToken = (payLoad) => {
  return jwt.sign(payLoad, process.env.REFRESH_TOKEN_SECRET);
};

const generateForgotPasswordToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });
};

export { isValidUserData, generateAccessToken, generateRefreshToken, generateForgotPasswordToken };
