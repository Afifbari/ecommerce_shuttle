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
			queryInterface.addColumn("products", "sku", {
				type: Sequelize.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			}),
			queryInterface.addColumn("products", "price", {
				type: Sequelize.FLOAT,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			}),
			queryInterface.addColumn("products", "unitsInStock", {
				type: Sequelize.INTEGER,
			}),
			queryInterface.addColumn("products", "unitsInOrder", {
				type: Sequelize.INTEGER,
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
			queryInterface.removeColumn("products", "sku"),
			queryInterface.removeColumn("products", "price"),
			queryInterface.removeColumn("products", "unitsInStock"),
			queryInterface.removeColumn("products", "unitsInOrder"),
		]);
	},
};
