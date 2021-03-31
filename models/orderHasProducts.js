module.exports = (sequelize, DataTypes) => {
	const Order_Has_Products = sequelize.define("Order_Has_Products", {
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		unitPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		totalPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	Order_Has_Products.belongsTo(sequelize.models.Order, {
		foreignKey: "orderId",
		onDelete: "CASCADE",
	});

	return Order_Has_Products;
};
