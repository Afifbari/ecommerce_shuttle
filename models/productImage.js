module.exports = (sequelize, DataTypes) => {
	const Product_Image = sequelize.define("Product_Image", {
		imageLink: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},

		uploadedAt: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	Product_Image.belongsTo(sequelize.models.Product, {
		foreignKey: "productId",
		onDelete: "CASCADE",
	});

	return Product_Image;
};
