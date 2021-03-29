const express = require("express");
const router = express.Router();

// Importing product related middlewares
const productMiddlewares = require("../middlewares/products");

// Get all products
router.get("/", productMiddlewares.getAllProducts);

// Create a product
router.post("/create", productMiddlewares.createProduct);

module.exports = router;
