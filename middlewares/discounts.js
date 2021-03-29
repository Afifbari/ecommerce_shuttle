const { Discount } = require("../models");

// Get all users
exports.getAllDiscounts = (req, res) => {
	Discount.findAll().then((discounts) => res.json({ discounts }));
};

// Create a product
exports.createDiscount = (req, res) => {
	const { code, type, amount, validity, discountsLeft } = req.body;

	Discount.create({
		code,
		type,
		amount: parseInt(amount),
		validity,
		discountsLeft: parseInt(discountsLeft),
	})
		.then((discounts) => res.json({ discounts }))
		.catch((err) => console.log(err));
};
