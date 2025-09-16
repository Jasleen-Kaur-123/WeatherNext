import * as dotenv from "dotenv";
import * as path from "path";

// Load .env from project root
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import weatherRoutes from "./routes/weather.routes";
import searchRoutes from "./routes/search.routes";
import { errorHandler } from "./middleware/errorhandler.middleware";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/searches", searchRoutes);

// Log API key to confirm it’s loaded
console.log("Loaded WEATHER_API_KEY:", process.env.WEATHER_API_KEY);

// Error handler
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
