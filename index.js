// index.js
require("dotenv").config(); // Only call this once at the entry point

const connectDB = require("./db/MongoDBConnect");
const express = require("express");
const morgan = require("morgan"); // HTTP request logging middleware
const helmet = require("helmet"); // Security middleware

const debug = require("debug"); // Debugging utility
const log = debug("app:log");

const app = express();

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  log("Morgan enabled...");
}

// Middleware
app.use(express.json());
app.use(helmet());

const urlRoutes = require("./routes/urls");
app.use("/api/v1/urls", urlRoutes);

// Start Server and Database connection
(async () => {
  await connectDB(); // Wait for the DB connection to succeed
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    log(`Server running on port ${port}`);
  });
})();
