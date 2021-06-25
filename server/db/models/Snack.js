const Sequelize = require("sequelize");
const db = require("../db");

const Snack = db.define("snack", {
	name: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
	isVegan: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
	isKosher: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
	isHalal: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
	isDairyFree: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
	isNutFree: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
	isGlutenFree: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
	isVegetarian: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Snack;
