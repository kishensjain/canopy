import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { clerkMiddleware } from "@clerk/express";

dotenv.config({ override: true });

const app = express();

app.use(express.json());
app.use(clerkMiddleware());

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Tree Tracker API running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  }
};

startServer();
