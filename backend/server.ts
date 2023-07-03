import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth";
import userRoute from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB successfully connected!"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.use(cors()); // Enable CORS
app.use(express.json()); // Parse request bodies as JSON

app.use("/api/auth", authRoute); // Authentication routes
app.use("/api/users", userRoute); // User routes

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server started on port ${PORT}`);
});
