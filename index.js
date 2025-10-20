import "dotenv/config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { middleware } from "./utils/middleware.js";

const app = express();

const PORT = process.env.PORT;

mongoose.set("strictQuery", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
connectDB();

app.use("/api", authRouter);
app.use("/api/private", middleware, protectedRoutes);

app.get("/", (req, res) => {
  res.send({ message: "Hello from API" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
