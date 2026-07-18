import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error("MongoDB connection failed:", err.message);
    } else {
      console.error("MongoDB connection failed:", err);
    }
    process.exit(1);
  }
}
