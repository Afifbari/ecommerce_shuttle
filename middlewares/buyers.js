const {
	Buyer,
	Product,
	User,
	Cart,
	Order,
	Discount,
	Order_Has_Products,
	Payment,
	Card,
} = require("../models");
const jwt = require("jsonwebtoken");
const jwtdecode = require("jwt-decode");
const cart = require("../models/cart");
const { body, validationResult } = require("express-validator");
const {
	loginSchema,
	addToCartSchema,
} = require("./helpers/validation_schema");

// Get all buyers
exports.getAllBuyers = (req, res) => {
	Buyer.findAll().then((buyers) => res.json({ buyers }));
};

// Create a buyer
exports.createBuyer = (req, res) => {
	const { name, email, phone, password } = req.body;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	Buyer.create({
		name,
		email,
		phone,
		password,
		userId: 3,
	})
		.then((users) => res.json({ users }))
		.catch((err) => console.log(err));
};

// Add product to cart
exports.addToCart = async (req, res) => {
	const { productId, quantity } = req.body;

	const decoded = jwtdecode(req.headers["authorization"]);
	const buyerId = decoded.user.id;
	const userId = decoded.user.userId;

	const buyerTypeId = await User.findOne({
		attributes: ["id"],
		where: { userType: "buyer" },
	});

	let result;

	try {
		result = await addToCartSchema.validateAsync(req.body);
	} catch (error) {
		return res.json({ error });
	}

	if (userId === buyerTypeId.id) {
		let product = await Product.findOne({
			where: { id: productId },
		});
		let productPrice = product.price;
		let totalPrice = quantity * productPrice;

		Cart.create({
			quantity,
			unitPrice: productPrice,
			totalPrice,
			status: "not ordered",
			productId,
			buyerId,
			orderId: null,
		})
			.then((cartProduct) => res.json({ cartProduct }))
			.catch((err) => {
				res.json({ msg: "Error while adding to cart." });
				console.log(err);
			});
	} else {
		res.json({ msg: "Only buyers can add to cart." });
	}
};

// Confirm cart order
exports.confirmOrder = async (req, res) => {
	const {
		discountCode,
		shipperId,
		paymentType,
		cardNumber,
		cardExpiry,
		cardSecurityCode,
	} = req.body;

	const decoded = jwtdecode(req.headers["authorization"]);
	const buyerId = decoded.user.id;
	const userId = decoded.user.userId;

	const buyerTypeId = await User.findOne({
		attributes: ["id"],
		where: { userType: "buyer" },
	});

	if (userId === buyerTypeId.id) {
		let discountAmount = 0;
		let priceBeforeDiscount = 0;
		let finalPrice = 0;
		let taxAmount = 0.15;
		let orderedOn = new Date();
		let orderStatus = "on process";
		let discountId = null;

		const cartItems = await Cart.findAll({ where: { buyerId } });
		const discount = await Discount.findOne({
			where: { code: discountCode },
		});

		cartItems.map((item) => (priceBeforeDiscount += item.totalPrice));

		if (discount !== null) {
			discountId = discount.id;
			if (discount.type === "flatAmount") {
				discountAmount = discount.amount;
			} else {
				discountAmount =
					priceBeforeDiscount * (discount.amount / 100);
			}
		}

		let priceAfterDiscount = priceBeforeDiscount - discountAmount;
		finalPrice = priceAfterDiscount * taxAmount + priceAfterDiscount;

		try {
			const order = await Order.create({
				orderedOn,
				priceBeforeDiscount,
				taxAmount,
				finalPrice,
				orderStatus,
				buyerId,
				discountId,
				shipperId,
			});

			res.json({ order });

			cartItems.map((item) =>
				Order_Has_Products.create({
					quantity: item.quantity,
					unitPrice: item.unitPrice,
					totalPrice: item.totalPrice,
					productId: item.productId,
					orderId: order.id,
				})
			);

			Cart.destroy({
				where: { buyerId },
			});

			let paymentDate = orderedOn;

			let payment = await Payment.create({
				paymentType,
				paymentDate,
				orderId: order.id,
			});

			if (paymentType === "card") {
				Card.create({
					cardNumber,
					cardExpiry,
					cardSecurityCode,
					paymentId: payment.id,
				});
			}
		} catch (error) {
			return res.json({ msg: "Error while confirming order." });
		}
	} else {
		res.json({ msg: "Only buyers can confirm order." });
	}
};

// Buyer login
exports.login = async (req, res) => {
	// const { email, password } = req.body;
	let result;

	try {
		result = await loginSchema.validateAsync(req.body);
		console.log(result);
	} catch (error) {
		return res.json({ msg: "Enter correct credentials." });
	}

	let user = await Buyer.findOne({
		where: { email: result.email, password: result.password },
	});

	if (user) {
		jwt.sign({ user: user }, "secretkey", (err, token) => {
			res.json({
				token: token,
				userType: "buyer",
			});
		});
	} else {
		res.json({ msg: "Email/password is incorrect." });
	}
};

// Format of Token
// Authorization: Bearer <access_token>

// Verify Token
exports.buyerVerifyToken = (req, res, next) => {
	// Get auth header value
	const bearerHeader = req.headers["authorization"];

	// Check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		const token = bearerHeader.split(" ")[1];

		// Set the token
		req.token = token;
		req.userType = "buyer";

		next();
	} else {
		// Forbidden
		return res.json({ msg: "Access denied." });
	}
};
