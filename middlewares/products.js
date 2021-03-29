const { Product } = require("../models");

exports.getAllProducts = (req, res) => {
	Product.findAll().then((products) => res.json({ products }));
};

// Create a product
exports.createProduct = (req, res) => {
	const { name } = req.body;

	Product.create({
		name,
	})
		.then((products) => res.json({ products }))
		.catch((err) => console.log(err));
};
