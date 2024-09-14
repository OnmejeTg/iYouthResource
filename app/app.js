import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  globalErrorHandler,
  notFoundHandler,
} from "../middlewares/errorHandling.js";
import userRouter from "../routes/userRouter.js";
import { authRouter } from "../routes/authRouter.js";
import passport from "passport";
import "../strategies/localStrategy.js";
import session from "express-session";
import "dotenv/config";
import MongoStore from "connect-mongo";
import transactionRouter from "../routes/transactionRouter.js";
import { isLoggedin } from "../middlewares/auth.js";

const app = express();
app.use(express.json());
const corsOptions = {
  origin: [
    "https://new-project-35520.web.app",
    "https://new-project-35520.web.app",
    "http://localhost:5173",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: "Authorization,Origin,X-Requested-With,Content-Type,Accept",
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.secretkey,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000 * 60 * 2, // 2 hours
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/trxn", isLoggedin, transactionRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
