require("dotenv").config({ path: "./.env" });

const config = require("./config");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const app = express();
const PORT = config.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MERN Stack API",
      version: "1.0.0",
      description: "API documentation for MERN Stack project",
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, "./routes/*.js"),
    path.join(__dirname, "./models/*.js"),
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic route for testing
app.get("/", (req, res) => {
  res.json({ message: "MERN Stack API is running" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
