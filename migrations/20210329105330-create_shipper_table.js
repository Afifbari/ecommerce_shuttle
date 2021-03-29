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
			queryInterface.createTable("Shippers", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				email: {
					type: Sequelize.STRING,
					allowNull: false,
					validate: {
						notEmpty: true,
					},
				},
				phone: {
					type: Sequelize.STRING,
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
		return Promise.all([queryInterface.dropTable("Shippers")]);
	},
};
