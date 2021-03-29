const { Shipper } = require("../models");

// Get all users
exports.getAllShippers = (req, res) => {
	Shipper.findAll().then((shippers) => res.json({ shippers }));
};

// Create a product
exports.createShipper = (req, res) => {
	const { name, email, phone } = req.body;

	Shipper.create({
		name,
		email,
		phone,
	})
		.then((shippers) => res.json({ shippers }))
		.catch((err) => console.log(err));
};
