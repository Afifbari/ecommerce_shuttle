const express = require("express");
const router = express.Router();

// Importing product related middlewares
const sellerMiddlewares = require("../middlewares/sellers");

// Get all buyers
router.get("/", sellerMiddlewares.getAllSellers);

// Create a buyer
router.post("/create", sellerMiddlewares.createSeller);

// Login
router.post("/login", sellerMiddlewares.login);

module.exports = router;
