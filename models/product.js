module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define("Product", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	return Product;
};
