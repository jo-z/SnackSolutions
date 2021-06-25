const Sequelize = require("sequelize");
const db = require("../db");

const Member = db.define("member", {
	isOwner: {
		type: Sequelize.DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Member;
