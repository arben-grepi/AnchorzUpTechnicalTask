import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Please provide the original URL"],
    unique: true,
    match: [
      /^https:\/\/www\.[^\s]+$/,
      "Please provide a valid URL starting with https://www.",
    ],
  },
  shortId: {
    type: String,
    required: [true, "Please provide a short URL identifier"],
    unique: true,
  },
  expiration: {
    type: String, // Create validation
    default: null,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  qrCode: {
    type: String, // Base64-encoded QR code
    default: null,
  },
});

export default mongoose.model("Url", urlSchema);
