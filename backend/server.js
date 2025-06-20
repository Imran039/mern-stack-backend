require("dotenv").config({ path: "./.env" });

const config = require("./config");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();
const PORT = config.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "MERN Stack API is running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
