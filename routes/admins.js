const express = require("express");
const router = express.Router();

// Importing product related middlewares
const adminMiddlewares = require("../middlewares/admins");

// Get all products
router.get("/", adminMiddlewares.getAllAdmins);

// Create a product
router.post("/login", adminMiddlewares.login);

module.exports = router;
