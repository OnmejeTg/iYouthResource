import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// const isLoggedin = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];
//     if (token == null) return res.sendStatus(401);
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//       if (err) return res.sendStatus(403);
//       req.user = user;
//       next();
//     });
//   };

const isLoggedin = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ message: "Unauthorised to perform this action" });
  }
  next();
};

export { isLoggedin };
