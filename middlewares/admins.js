const { User, Admin } = require("../models");
const jwt = require("jsonwebtoken");

// Get all admins
exports.getAllAdmins = (req, res) => {
	Admin.findAll().then((admins) => res.json({ admins: admins }));
};

// Admin login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	let user = await Admin.findOne({
		where: { email: email, password: password },
	});

	if (user) {
		user = JSON.stringify(user);

		jwt.sign({ user: user }, "secretkey", (err, token) => {
			res.json({
				token: token,
				userType: "admin",
			});
		});
	} else {
		res.json({ msg: "Email/password is incorrect." });
	}
};

// Format of Token
// Authorization: Bearer <access_token>

// Verify Token
exports.adminVerifyToken = (req, res, next) => {
	// Get auth header value
	const bearerHeader = req.headers["authorization"];

	// Check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		const token = bearerHeader.split(" ")[1];

		// Set the token
		req.token = token;
		req.userType = req.headers["usertype"];

		next();
	} else {
		// Forbidden
		return res.json({ msg: "Access denied." });
	}
};
