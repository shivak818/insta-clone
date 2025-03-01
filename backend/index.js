require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = require('./App'); // Import Routes

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Post";

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => console.error("❌ MongoDB Connection Error:", error));

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
