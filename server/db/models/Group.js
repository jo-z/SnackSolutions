const { Sequelize } = require("sequelize/types");
const db = require("../db");

const Group = db.define("group", {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = Group;
