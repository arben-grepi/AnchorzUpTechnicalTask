// index.js
require("dotenv").config(); // Only call this once at the entry point

const connectDB = require("./db/MongoDBConnect");
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Start Server and Database connection
(async () => {
  await connectDB(); // Wait for the DB connection to succeed
  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
