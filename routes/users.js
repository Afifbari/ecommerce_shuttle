const express = require("express");
const router = express.Router();

// Importing product related middlewares
const userMiddlewares = require("../middlewares/users");

// Get all products
router.get("/", userMiddlewares.getAllUsers);

// Create a product
router.post("/create", userMiddlewares.createUser);

module.exports = router;
