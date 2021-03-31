module.exports = (sequelize, DataTypes) => {
	const Shipper = sequelize.define("Shipper", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
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
			unique: true,
			validate: {
				notEmpty: true,
			},
		},
	});

	Shipper.hasMany(sequelize.models.Order, {
		foreignKey: "shipperId",
		onDelete: "SET NULL",
	});

	return Shipper;
};
