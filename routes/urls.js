import express from "express";
import QRCode from "qrcode"; // Import QRCode library
import { nanoid } from "nanoid"; // For generating short IDs

import Url from "../models/Url.js"; // Import the Url model

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

    const shortId = nanoid(5); // Generate a short ID
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortId}`; // Create the full short URL

    // Generate QR code
    const qrCode = await QRCode.toDataURL(shortUrl);

    // Create a new URL document
    url = await Url.create({
      originalUrl,
      shortId,
      expiration: expiration || null,
      qrCode, // Save the generated QR code
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

// PUT /api/v1/urls/:shortId/click
router.put("/:shortId/click", async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clickCount: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ msg: "URL not found" });
    }
    return res.status(200).json({ success: true, data: url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE method to remove a URL by shortId
router.delete("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOneAndDelete({ shortId });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "URL deleted successfully",
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
