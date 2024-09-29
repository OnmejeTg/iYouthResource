import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const isLoggedin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded; // Add user data to request object
    next();
  });
};

// const isLoggedin = (req, res, next) => {
//   if (!req.user) {
//     return res
//       .status(401)
//       .send({ message: "Unauthorised to perform this action" });
//   }
//   next();
// };

export { isLoggedin };
