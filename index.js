import { fileURLToPath } from "url";
import { dirname, join } from "path";
import "./config.js"; // Ensure dotenv is loaded before any other imports

import connectDB from "./db/MongoDBConnect.js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import debug from "debug";
import urlRoutes from "./routes/urls.js";

const log = debug("app:log");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the "Client" directory
app.use(express.static(join(__dirname, "Client"))); // Correct path

// Log for debugging
console.log("Serving static files from:", join(__dirname, "Client"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  log("Morgan enabled...");
}

app.use(express.json());
app.use(helmet());

// API routes
app.use("/api/v1/urls", urlRoutes);

(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
