const Sequelize = require("sequelize");
const db = require("../db");

const Rating = db.define("rating", {
	rating: {
		type: Sequelize.DataTypes.INTEGER,
		defaultValue: 1,
		validate: {
			min: 1,
			max: 5,
		},
	},
});

module.exports = Rating;
