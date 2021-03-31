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
			queryInterface.createTable("Cards", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				cardNumber: {
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				cardExpiry: {
					type: Sequelize.DATE,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				cardSecurityCode: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				paymentId: {
					type: Sequelize.INTEGER,
					references: {
						model: "payments",
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
		return Promise.all([queryInterface.dropTable("Cards")]);
	},
};
