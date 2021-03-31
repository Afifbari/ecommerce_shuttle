module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define("Payment", {
		paymentType: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		paymentDate: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	Payment.belongsTo(sequelize.models.Order, {
		foreignKey: "orderId",
		onDelete: "CASCADE",
	});

	Payment.hasMany(sequelize.models.Card, {
		foreignKey: "paymentId",
		onDelete: "CASCADE",
	});

	return Payment;
};
