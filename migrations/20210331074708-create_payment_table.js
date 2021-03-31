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
			queryInterface.createTable("Payments", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				paymentType: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				uploadedAt: {
					type: Sequelize.DATE,
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
		return Promise.all([queryInterface.dropTable("Payments")]);
	},
};
