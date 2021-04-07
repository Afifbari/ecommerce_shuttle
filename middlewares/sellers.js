const { Seller } = require("../models");
const jwt = require("jsonwebtoken");
const {
	loginSchema,
	sellerSignupSchema,
} = require("./helpers/validation_schema");

// Get all sellers
exports.getAllSellers = (req, res) => {
	Seller.findAll().then((sellers) => res.json({ sellers }));
};

// Create a seller
exports.createSeller = async (req, res) => {
	const {
		companyName,
		contactName,
		phone,
		email,
		password,
	} = req.body;

	let result;

	try {
		result = await sellerSignupSchema.validateAsync(req.body);
	} catch (error) {
		return res.json({ error });
	}

	Seller.create({
		companyName,
		contactName,
		phone,
		email,
		password,
		userId: 2,
	})
		.then((seller) => res.json({ seller }))
		.catch((err) => console.log(err));
};

// Seller login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		result = await loginSchema.validateAsync(req.body);
		console.log(result);
	} catch (error) {
		return res.json({ msg: "Enter correct credentials." });
	}

	let user = await Seller.findOne({
		where: { email: email, password: password },
	});

	if (user) {
		// user = JSON.stringify(user);

		jwt.sign({ user: user }, "secretkey", (err, token) => {
			res.json({
				token: token,
				userType: "seller",
			});
		});
	} else {
		res.json({ msg: "Email/password is incorrect." });
	}
};

// Format of Token
// Authorization: Bearer <access_token>

// Verify Token
exports.sellerVerifyToken = (req, res, next) => {
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
