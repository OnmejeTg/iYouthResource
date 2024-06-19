import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { globalErrorHandler, notFoundHandler } from "../middlewares/errorHandling.js";
import userRouter from "../routes/userRouter.js";
import { authRouter } from "../routes/authRouter.js";


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
app.use(bodyParser.json())

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.use(notFoundHandler)
app.use(globalErrorHandler)
export default app