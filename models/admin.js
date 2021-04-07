module.exports = (sequelize, DataTypes) => {
	const Admin = sequelize.define("Admin", {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
				isEmail: true,
				len: [2, 12],
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
	});

	return Admin;
};
