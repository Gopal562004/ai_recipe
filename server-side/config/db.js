const mongoose = require("mongoose");
require("dotenv").config(); // Ensure dotenv is loaded

// Function to connect to the database
const connectDB = async () => {
  try {
    const dbURI = process.env.MONGODB_URL;

    // Connect to MongoDB without deprecated options
    await mongoose.connect(dbURI);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the DB connection fails
  }
};

module.exports = connectDB;
