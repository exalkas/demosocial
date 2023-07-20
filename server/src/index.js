import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

import db from "./config/db.js";

dotenv.config();

db();

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CLIENT
      : "http://localhost:3000",
  credentials: true,
  preflightContinue: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser()); // reads cookies in every request
app.use(express.json()); // handle body object from requests

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use("/images", express.static("./server/uploads"));

app.listen(5000, () => console.log("Server is up and running at port 5000"));
