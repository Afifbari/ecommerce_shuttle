module.exports = (sequelize, DataTypes) => {
	const Buyer = sequelize.define("Buyer", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
			},
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	// Buyer.hasMany(sequelize.models.Order, {
	// 	foreignKey: "buyerId",
	// 	onDelete: "CASCADE",
	// });

	return Buyer;
};
