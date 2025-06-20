const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Product image URL is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Product", productSchema);
