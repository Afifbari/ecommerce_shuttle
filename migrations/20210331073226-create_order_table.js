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
			queryInterface.createTable("Orders", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				orderedOn: {
					type: Sequelize.DATE,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				priceBeforeDiscount: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				taxAmount: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				finalPrice: {
					type: Sequelize.FLOAT,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				orderStatus: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				buyerId: {
					type: Sequelize.INTEGER,
					references: {
						model: "buyers",
						key: "id",
					},
					allowNull: false,
				},
				discountId: {
					type: Sequelize.INTEGER,
					references: {
						model: "discounts",
						key: "id",
					},
					allowNull: false,
				},
				shipperId: {
					type: Sequelize.INTEGER,
					references: {
						model: "shippers",
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
		return Promise.all([queryInterface.dropTable("Orders")]);
	},
};
