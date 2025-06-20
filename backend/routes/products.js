const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// CREATE - POST /api/products
router.post("/", async (req, res) => {
  try {
    const { title, image, description, price } = req.body;

    // Validate required fields
    if (
      !title ||
      !image ||
      !description ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const product = new Product({
      title,
      image,
      description,
      price,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// READ ALL - GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// READ ONE - GET /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE - PUT /api/products/:id
router.put("/:id", async (req, res) => {
  try {
    const { title, image, description, price } = req.body;

    // Validate required fields
    if (
      !title ||
      !image ||
      !description ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return res.status(400).json({ message: "Invalid product data" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, image, description, price },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE - DELETE /api/products/:id
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
