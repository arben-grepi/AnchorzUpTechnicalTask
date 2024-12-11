import "../config.js"; // Ensure dotenv is loaded before any other imports

import mongoose from "mongoose";
import Url from "../models/Url.js"; // Ensure you use the correct file extension for ES modules
import { nanoid } from "nanoid";
import colors from "colors";
import debug from "debug";

const log = debug("app:log");

import { addMinutesToCurrentLocaleTime, startTimer } from "./utils.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    log("MongoDB connected in createData.js...".green.bold);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

// Dummy URLs with expiration times
const dummyUrls = [
  {
    originalUrl: "https://google.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentLocaleTime(1),
    clickCount: 5,
  },
  {
    originalUrl: "https://github.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentLocaleTime(2),
    clickCount: 10,
  },
  {
    originalUrl: "https://stackoverflow.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentLocaleTime(3),
    clickCount: 7,
  },
  {
    originalUrl: "https://npmjs.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentLocaleTime(4),
    clickCount: 3,
  },
  {
    originalUrl: "https://mozilla.org",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentLocaleTime(5),
    clickCount: 15,
  },
  {
    originalUrl: "https://wikipedia.org",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentLocaleTime(6),
    clickCount: 9,
  },
];

// Seed data to MongoDB
const seedData = async () => {
  try {
    await Url.deleteMany({});
    console.log("Existing data cleared...".yellow);
    await Url.insertMany(dummyUrls);
    console.log("Dummy data inserted...".green.bold);
    process.exit(); // Exit after seeding
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

// Start timers for expiration
const setTimerForExpiration = () => {
  dummyUrls.forEach((url) => {
    if (url.expiration) {
      startTimer(url.expiration); // Call startTimer for each expiration
    }
  });
};

// Main execution
(async () => {
  await connectDB(); // Connect to the database
  await seedData(); // Seed the data
  setTimerForExpiration(); // Start timers for expiration
})();
