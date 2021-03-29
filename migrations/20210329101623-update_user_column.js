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
			queryInterface.changeColumn("users", "userType", {
				type: Sequelize.STRING,
				unique: true,
				allowNull: false,
				validate: {
					notEmpty: true,
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
			queryInterface.changeColumn("users", "userType", {
				type: Sequelize.STRING,
				unique: false,
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			}),
		]);
	},
};
