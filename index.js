// index.js
// config.js

import "./config.js"; // Ensure dotenv is loaded before any other imports

import connectDB from "./db/MongoDBConnect.js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import debug from "debug";
import urlRoutes from "./routes/urls.js";

const log = debug("app:log");
const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  log("Morgan enabled...");
}

app.use(express.json());
app.use(helmet());

app.use("/api/v1/urls", urlRoutes);

(async () => {
  await connectDB();
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    log(`Server running on port ${port}`);
  });
})();
