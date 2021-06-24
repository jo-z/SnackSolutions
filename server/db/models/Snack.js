const { Sequelize } = require("sequelize/types");
const db = require("../db");

const Snack = db.define("snack", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	isVegan: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	isKosher: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	isHalal: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	isDairyFree: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	isNutFree: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	isGlutenFree: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
	isVegetarian: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Snack;
