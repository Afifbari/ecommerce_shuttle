const { Shipper } = require("../models");
const jwt = require("jsonwebtoken");

// Get all shippers
exports.getAllShippers = (req, res) => {
	jwt.verify(req.token, "secretkey", (err, authData) => {
		console.log(req.userType);
		if (err || req.userType !== "admin") {
			res.json({ msg: "Access Denied. (middleware)" });
		} else {
			Shipper.findAll().then((shippers) => res.json({ shippers }));
		}
	});
};

// Create a Shipper
exports.createShipper = async (req, res) => {
	const { name, email, phone } = req.body;

	jwt.verify(req.token, "secretkey", (err, authData) => {
		console.log(req.userType);
		if (err || req.userType !== "admin") {
			res.json({ msg: "Access Denied. (middleware)" });
		} else {
			Shipper.create({
				name,
				email,
				phone,
			})
				.then((shippers) => res.json({ shippers }))
				.catch((err) => {
					console.log(err);
					res.json({ msg: "Error in database." });
				});
		}
	});
};
