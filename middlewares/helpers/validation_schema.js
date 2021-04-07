const Joi = require("joi");

const loginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(2).required(),
});

const sellerSignupSchema = Joi.object({
	companyName: Joi.string().required().min(3),
	contactName: Joi.string().required().min(3),
	phone: Joi.string().required().min(3).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(3).required().alphanum(),
});

const createProductSchema = Joi.object({
	name: Joi.string().required().min(3),
	sku: Joi.string().required().min(2),
	price: Joi.string().pattern(new RegExp("[0-9]")).required(),
	unitsInStock: Joi.string().pattern(new RegExp("[0-9]")).required(),
	unitsInOrder: Joi.string().pattern(new RegExp("[0-9]")).required(),
	categoryId: Joi.string().pattern(new RegExp("[0-9]")).required(),
	sellerId: Joi.string().pattern(new RegExp("[0-9]")).required(),
	imageLink: Joi.string().required(),
});

const addToCartSchema = Joi.object({
	productId: Joi.number().integer().min(1).required(),
	quantity: Joi.number().integer().min(1).required(),
});

module.exports = {
	loginSchema,
	sellerSignupSchema,
	createProductSchema,
	addToCartSchema,
};
