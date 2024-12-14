import "./config.js"; // Ensure dotenv is loaded before any other imports
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import connectDB from "./db/MongoDBConnect.js";
import urlRoutes from "./routes/urls.js";
import log from "./logger.js";

const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  log("Morgan enabled...");
}

app.use(express.json());
app.use(helmet());
app.use(cors()); // Enable CORS

// API routes
app.use("/api/v1/urls", urlRoutes);

(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
