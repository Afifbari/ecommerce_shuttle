const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Importing product related middlewares
const buyerMiddlewares = require("../middlewares/buyers");

// Get all buyers
router.get("/", buyerMiddlewares.getAllBuyers);

// Create a buyer
router.post(
	"/create",
	body("email").isEmail().isLength({ min: 15 }),
	buyerMiddlewares.createBuyer
);

// Add to cart
router.post("/addToCart", buyerMiddlewares.addToCart);

// Add to cart
router.post("/confirmOrder", buyerMiddlewares.confirmOrder);

// Login
router.post("/login", buyerMiddlewares.login);

module.exports = router;
