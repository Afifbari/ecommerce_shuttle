module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define("Product", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		sku: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		unitsInStock: {
			type: DataTypes.INTEGER,
		},
		unitsInOrder: {
			type: DataTypes.INTEGER,
		},
	});

	Product.belongsTo(sequelize.models.Category, {
		foreignKey: "categoryId",
		onDelete: "CASCADE",
	});

	Product.hasMany(sequelize.models.Order_Has_Products, {
		foreignKey: "productId",
		onDelete: "CASCADE",
	});

	return Product;
};
