const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let products = [
  // Example product
  // { id: 1, title: 'Sample', image: 'https://...', description: 'desc', price: 10 }
];
let nextId = 1;

// CREATE
app.post("/api/products", (req, res) => {
  const { title, image, description, price } = req.body;
  if (
    !title ||
    !image ||
    !description ||
    typeof price !== "number" ||
    price <= 0
  ) {
    return res.status(400).json({ message: "Invalid product data" });
  }
  const product = { id: nextId++, title, image, description, price };
  products.push(product);
  res.status(201).json(product);
});

// READ ALL
app.get("/api/products", (req, res) => {
  res.json(products);
});

// READ ONE
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// UPDATE
app.put("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ message: "Product not found" });
  const { title, image, description, price } = req.body;
  if (
    !title ||
    !image ||
    !description ||
    typeof price !== "number" ||
    price <= 0
  ) {
    return res.status(400).json({ message: "Invalid product data" });
  }
  product.title = title;
  product.image = image;
  product.description = description;
  product.price = price;
  res.json(product);
});

// DELETE
app.delete("/api/products/:id", (req, res) => {
  const index = products.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });
  products.splice(index, 1);
  res.json({ message: "Product deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
