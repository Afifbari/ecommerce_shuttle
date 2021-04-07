const { User } = require("../models");

// Get all users
exports.getAllUsers = (req, res) => {
	User.findAll().then((users) => res.json({ users }));
};

// Create a User
exports.createUser = (req, res) => {
	const { userType } = req.body;

	User.create({
		userType,
	})
		.then((users) => res.json({ users }))
		.catch((err) => console.log(err));
};
