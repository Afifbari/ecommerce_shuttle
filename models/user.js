module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		userType: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
			},
		},
	});

	return User;
};
