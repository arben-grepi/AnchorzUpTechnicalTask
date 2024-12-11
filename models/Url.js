import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, "Please provide the original URL"],
    unique: true,
    match: [/^https?:\/\/[^\s$.?#].[^\s]*$/, "Please provide a valid URL"],
  },
  shortId: {
    type: String,
    required: [true, "Please provide a short URL identifier"],
    unique: true,
  },
  expiration: {
    type: String, // Store as a string
    default: null,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Url", urlSchema);
