import express from "express";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

const router = express.Router();

// Shorten a URL
router.post("/", async (req, res) => {
  const { originalUrl, expiration } = req.body;

  try {
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(400).json({
        success: false,
        message: "URL already shortened",
      });
    }

    const shortId = nanoid(6); // Generate unique ID
    const newUrl = new Url({ originalUrl, shortId, expiration });

    await newUrl.save();
    res.status(201).json({
      success: true,
      data: { shortUrl: `http://localhost:5000/api/v1/urls/${shortId}` },
    });
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      res.status(400).json({ success: false, message: "URL already exists" });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
});

// Redirect to the original URL
router.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ success: false, message: "URL not found" });
    }

    if (url.expiration && new Date() > url.expiration) {
      await Url.deleteOne({ shortId }); // Delete expired URL
      return res.status(410).json({ success: false, message: "URL expired" });
    }

    url.clickCount++;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get stats of a URL
router.get("/:shortId/stats", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        originalUrl: url.originalUrl,
        clickCount: url.clickCount,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

export default router;
