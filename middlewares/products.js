const { Product, User, Product_Image } = require("../models");
const jwtdecode = require("jwt-decode");
const {
	createProductSchema,
} = require("./helpers/validation_schema");

// Get all products
exports.getAllProducts = (req, res) => {
	Product.findAll().then((products) => res.json({ products }));
};

// Create a product
exports.createProduct = async (req, res) => {
	const {
		name,
		sku,
		price,
		unitsInStock,
		unitsInOrder,
		categoryId,
		sellerId,
		imageLink,
	} = req.body;

	const decoded = jwtdecode(req.headers["authorization"]);
	const userId = decoded.user.userId;

	let result;

	try {
		result = await createProductSchema.validateAsync(req.body);
	} catch (error) {
		return res.json({ error });
	}

	const sellerTypeId = await User.findOne({
		attributes: ["id"],
		where: { userType: "seller" },
	});

	if (userId === sellerTypeId.id) {
		Product.create({
			name,
			sku,
			price: parseFloat(price),
			unitsInStock: parseInt(unitsInStock),
			unitsInOrder: parseInt(unitsInOrder),
			categoryId: parseInt(categoryId),
			sellerId: parseInt(sellerId),
		})
			.then((product) => {
				Product_Image.create({
					imageLink,
					uploadedAt: new Date(),
					productId: product.id,
				});

				res.json({ product });
			})
			.catch((err) => console.log(err));
	} else {
		res.json({ msg: "Access denied." });
	}
};
