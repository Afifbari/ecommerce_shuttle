const express = require("express");
const router = express.Router();

// Importing product related middlewares
const discountMiddlewares = require("../middlewares/discounts");

// Get all products
router.get("/", discountMiddlewares.getAllDiscounts);

// Create a product
router.post("/create", discountMiddlewares.createDiscount);

module.exports = router;
