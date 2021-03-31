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

	return Payment;
};
