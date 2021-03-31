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
			queryInterface.addColumn("products", "categoryId", {
				type: Sequelize.INTEGER,
				references: {
					model: "categories",
					key: "id",
				},
				allowNull: false,
			}),
			queryInterface.addColumn("products", "sellerId", {
				type: Sequelize.INTEGER,
				references: {
					model: "sellers",
					key: "id",
				},
				allowNull: false,
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

		/*

    .then(() =>
					queryInterface.addConstraint("products", {
						type: "foreign key",
						fields: ["categoryId"],
						name: "category_fkey",
						references: {
							table: "categories",
							field: "id",
						},
						onDelete: "cascade",
					})
				),

    */
		return Promise.all([
			queryInterface.removeColumn("products", "categoryId"),
			queryInterface.removeColumn("products", "sellerId"),
		]);
	},
};
