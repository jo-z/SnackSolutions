const Sequelize = require("sequelize");
const db = require("../db");

const Group = db.define("group", {
	name: {
		type: Sequelize.DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = Group;
