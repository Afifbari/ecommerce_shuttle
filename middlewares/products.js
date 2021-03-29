const { Product } = require("../models");

exports.getAllProducts = (req, res) => {
	Product.findAll().then((products) => res.json({ products }));
};

// Create a product
exports.createProduct = (req, res) => {
	const { name, sku, price, unitsInStock, unitsInOrder } = req.body;

	Product.create({
		name,
		sku,
		price: parseFloat(price),
		unitsInStock: parseInt(unitsInStock),
		unitsInOrder: parseInt(unitsInOrder),
	})
		.then((products) => res.json({ products }))
		.catch((err) => console.log(err));
};
