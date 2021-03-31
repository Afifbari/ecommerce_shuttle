"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
		return Promise.all([
			queryInterface.createTable("Order_has_products", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				quantity: {
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				unitPrice: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				totalPrice: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				orderId: {
					type: Sequelize.INTEGER,
					references: {
						model: "orders",
						key: "id",
					},
					allowNull: false,
				},
				productId: {
					type: Sequelize.INTEGER,
					references: {
						model: "products",
						key: "id",
					},
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			}),
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
		return Promise.all([
			queryInterface.dropTable("Order_has_products"),
		]);
	},
};
