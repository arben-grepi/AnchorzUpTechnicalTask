import mongoose from "mongoose";

/**
 * Schema definition for storing URL data in the MongoDB database.
 */
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Please provide the original URL"], // Ensures the original URL is provided
    unique: true, // Prevents duplicate entries for the same URL
    match: [
      /^https:\/\/www\.[^\s]+$/, // Regex for validating URLs starting with "https://www."
      "Please provide a valid URL starting with https://www.", // Custom error message for invalid URLs
    ],
  },
  shortId: {
    type: String,
    required: [true, "Please provide a short URL identifier"], // Ensures the short URL identifier is provided
    unique: true, // Prevents duplicate short IDs
  },
  expiration: {
    type: String, // Represents the expiration date/time of the shortened URL
    default: null, // No expiration by default
  },
  clickCount: {
    type: Number,
    default: 0, // Tracks the number of times the URL has been clicked
  },
  qrCode: {
    type: String, // Stores the Base64-encoded QR code for the URL
    default: null, // QR code generation is optional
  },
});

/**
 * Exports the Mongoose model for interacting with the URL collection.
 * The model is built using the defined `urlSchema`.
 */
export default mongoose.model("Url", urlSchema);
