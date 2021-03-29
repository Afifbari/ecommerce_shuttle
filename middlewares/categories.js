const { Category } = require("../models");

// Get all users
exports.getAllCategories = (req, res) => {
	Category.findAll().then((categories) => res.json({ categories }));
};

// Create a product
exports.createCategory = (req, res) => {
	const { name } = req.body;

	Category.create({
		name,
	})
		.then((categories) => res.json({ categories }))
		.catch((err) => console.log(err));
};
