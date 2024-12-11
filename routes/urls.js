import express from "express";
import Url from "../models/Url.js"; // Import the Url model
import { nanoid } from "nanoid"; // For generating short IDs

const router = express.Router();

// GET method to retrieve all URLs
router.get("/", async (req, res) => {
  try {
    const urls = await Url.find(); // Fetch all URLs from the database
    res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// POST method to create a new URL
router.post("/", async (req, res) => {
  const { originalUrl, expiration } = req.body;

  // Validate input
  if (!originalUrl) {
    return res.status(400).json({
      success: false,
      message: "Original URL is required",
    });
  }

  try {
    // Check if the URL already exists
    let url = await Url.findOne({ originalUrl });
    if (url) {
      return res.status(400).json({
        success: false,
        message: "URL already exists",
        data: url,
      });
    }

    // Create a new URL document
    url = await Url.create({
      originalUrl,
      shortId: nanoid(5), // Generate a unique short ID
      expiration: expiration || null, // Use provided expiration or set it to null
    });

    res.status(201).json({
      success: true,
      data: url,
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;
