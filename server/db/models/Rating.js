const { Sequelize } = require("sequelize/types");
const db = require("../db");

const Rating = db.define("rating", {
	rating: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		validate: {
			min: 1,
			max: 5,
		},
	},
});

module.exports = Rating;
