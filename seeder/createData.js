const mongoose = require("mongoose");
require("dotenv").config(); // Only call this once at the entry point
const Url = require("../models/Url"); // Adjust the path to your Url model
const { nanoid } = require("nanoid");
const colors = require("colors");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...".green.bold);
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1);
  }
};

// Function to add minutes to the current time (in local time)
const addMinutesToCurrentTime = (minutes) => {
  const currentDate = new Date(); // Get the current date and time in local time
  currentDate.setMinutes(currentDate.getMinutes() + minutes); // Add the desired minutes

  // Return the date as UTC (in ISO format)
  return new Date(currentDate); // This stores the time correctly (local + minutes), but in UTC format
};

// Example URL data with expiration times added dynamically (1-6 minutes from now)
const dummyUrls = [
  {
    originalUrl: "https://google.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentTime(1), // 1 minute from now (UTC format)
    clickCount: 5,
  },
  {
    originalUrl: "https://github.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentTime(2), // 2 minutes from now (UTC format)
    clickCount: 10,
  },
  {
    originalUrl: "https://stackoverflow.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentTime(3), // 3 minutes from now (UTC format)
    clickCount: 7,
  },
  {
    originalUrl: "https://npmjs.com",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentTime(4), // 4 minutes from now (UTC format)
    clickCount: 3,
  },
  {
    originalUrl: "https://mozilla.org",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentTime(5), // 5 minutes from now (UTC format)
    clickCount: 15,
  },
  {
    originalUrl: "https://wikipedia.org",
    shortId: nanoid(5),
    expiration: addMinutesToCurrentTime(6), // 6 minutes from now (UTC format)
    clickCount: 9,
  },
];

// To seed data to MongoDB, you would insert it into your database like so
const seedData = async () => {
  try {
    // Optionally clear existing data
    await Url.deleteMany({});
    console.log("Existing data cleared...".yellow);

    // Insert dummy data
    await Url.insertMany(dummyUrls);
    console.log("Dummy data inserted...".green.bold);

    process.exit(); // Exit after seeding
  } catch (err) {
    console.error(`Error: ${err.message}`.red.bold);
    process.exit(1); // Exit with failure
  }
};

// Connect to MongoDB and run the seed
(async () => {
  await connectDB(); // Connect to DB
  await seedData(); // Seed the data
})();
