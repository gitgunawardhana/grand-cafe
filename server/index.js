import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import allRoutes from "./routes/index.js";
import { connectDB } from "./utils/dbConnection.js";

const app = express();
dotenv.config();

// middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

// routes
app.use("/api", allRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on PORT ${PORT}`);
});
