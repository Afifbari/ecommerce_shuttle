const express = require("express");
const router = express.Router();

// Importing product related middlewares
const categoryMiddlewares = require("../middlewares/categories");

// Get all products
router.get("/", categoryMiddlewares.getAllCategories);

// Create a product
router.post("/create", categoryMiddlewares.createCategory);

module.exports = router;
