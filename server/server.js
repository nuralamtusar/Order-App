// Import required dependencies
const express = require("express");
require("dotenv").config();
const connectDB = require("./database/db.js");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes.js");

// Create an Express server
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use order routes
app.use("/", orderRoutes);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server started");
});
