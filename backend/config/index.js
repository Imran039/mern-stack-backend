const dotenv = require("dotenv");
const path = require("path");

// Only load .env file in development environment
if (process.env.NODE_ENV !== "production") {
  const result = dotenv.config({ path: path.resolve(__dirname, "../.env") });

  if (result.error) {
    throw result.error;
  }
}

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};
