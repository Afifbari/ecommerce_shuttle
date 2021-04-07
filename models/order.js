module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define("Order", {
		orderedOn: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		priceBeforeDiscount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		taxAmount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		finalPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		orderStatus: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	Order.belongsTo(sequelize.models.Buyer, {
		foreignKey: "buyerId",
		onDelete: "CASCADE",
	});

	Order.belongsTo(sequelize.models.Discount, {
		foreignKey: "discountId",
		onDelete: "SET NULL",
	});

	Order.hasMany(sequelize.models.Cart, {
		foreignKey: "orderId",
		onDelete: "SET NULL",
	});

	return Order;
};
