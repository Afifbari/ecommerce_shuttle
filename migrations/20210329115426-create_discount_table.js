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
			queryInterface.createTable("Discounts", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				code: {
					type: Sequelize.STRING,
					allowNull: false,
					unique: true,
					validate: {
						notEmpty: true,
					},
				},
				type: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				amount: {
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				validity: {
					type: Sequelize.DATE,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				discountsLeft: {
					type: Sequelize.INTEGER,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
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
		return Promise.all([queryInterface.dropTable("Discounts")]);
	},
};
