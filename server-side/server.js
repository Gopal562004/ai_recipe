const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const savedRoutes = require("./routes/saved.route");
const aiGenerateRoutes = require("./routes/ai-generate.route");
// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = require("./config/db");
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // your React frontend origin
    credentials: true, // allow cookies and credentials
  })
);

//app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/saved", savedRoutes);
app.use("/ai", aiGenerateRoutes);

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
};

app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
