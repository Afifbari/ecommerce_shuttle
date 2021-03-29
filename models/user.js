module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("User", {
		userType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	return User;
};
