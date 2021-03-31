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

	User.hasMany(sequelize.models.Seller, {
		foreignKey: "userId",
		onDelete: "CASCADE",
	});

	User.hasMany(sequelize.models.Admin, {
		foreignKey: "userId",
		onDelete: "CASCADE",
	});

	User.hasMany(sequelize.models.Buyer, {
		foreignKey: "userId",
		onDelete: "CASCADE",
	});

	return User;
};
