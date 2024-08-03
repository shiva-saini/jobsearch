import "express-async-errors";
//setting up for .env file
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
//morgan is used to log the type of request GET /api/v1/jobs 200 34.966 ms - 11
import morgan from "morgan";
//routers
import userRouter from './routes/userRouter.js'
import jobRouter from "./routes/jobRouter.js";
import authRouter from './routes/authRouter.js'
import mongoose from "mongoose";
//handler middlewares
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//json parser
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});




//job router middleware
debugger
app.use("/api/v1/jobs",authenticateUser, jobRouter);
debugger
app.use("/api/v1/auth", authRouter);
debugger
app.use('/api/v1/users',authenticateUser,userRouter)
debugger
//not found
app.use("*", (req, res) => {
  res.status(404).json({ Message: "not found" });
});

//custom error middle ware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
