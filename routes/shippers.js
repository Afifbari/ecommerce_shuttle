const express = require("express");
const router = express.Router();

// Importing product related middlewares
const shipperMiddlewares = require("../middlewares/shippers");

// Get all products
router.get("/", shipperMiddlewares.getAllShippers);

// Create a product
router.post("/create", shipperMiddlewares.createShipper);

module.exports = router;
