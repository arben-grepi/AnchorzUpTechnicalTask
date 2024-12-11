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
    validate: {
      //REPLACE THIS WITH JOI
      validator: function (value) {
        // Regular expression for the format "DD.MM.YYYY HH:MM:SS"
        const regex = /^\d{2}\.\d{2}\.\d{4} \d{1,2}:\d{2}:\d{2}$/;
        return value === null || regex.test(value); // Validate the format
      },
      message: 'Invalid date format. Expected "DD.MM.YYYY HH:MM:SS".',
    },
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Url", urlSchema);
