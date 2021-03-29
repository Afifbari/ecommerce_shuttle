const express = require("express");
const db = require("./models");

// // Route imports
const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categories");
const shipperRoutes = require("./routes/shippers");
const discountRoutes = require("./routes/discounts");

// Initilizing express
const app = express();

// Body Parser Middleware - to read json body from post methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// APIs

// Product
app.use("/product/", productRoutes);

// User
app.use("/user/", userRoutes);

// Category
app.use("/category/", categoryRoutes);

// Shipper
app.use("/shipper/", shipperRoutes);

// Discount
app.use("/discount/", discountRoutes);

// Connect to database and run server
db.sequelize.sync().then((req) => {
	app.listen(3000, () => {
		console.log("Database is connected.");
		console.log("Server is running.");
	});
});
