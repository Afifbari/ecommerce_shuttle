module.exports = (sequelize, DataTypes) => {
	const Cart = sequelize.define("Cart", {
		totalPrice: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		quantity: {
			type: DataTypes.FLOAT,
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
		status: {
			type: DataTypes.STRING,
			allowNull: true,
			validate: {
				notEmpty: true,
			},
		},
	});

	Cart.belongsTo(sequelize.models.Buyer, {
		foreignKey: "buyerId",
		onDelete: "CASCADE",
	});

	return Cart;
};
