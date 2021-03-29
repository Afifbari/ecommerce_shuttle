const express = require("express");
const router = express.Router();

// Importing product related middlewares
const productMiddlewares = require("../middlewares/products");

// Get all products
router.get("/", productMiddlewares.getAllProducts);

module.exports = router;
