//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Snack = require("./models/Snack");
const Group = require("./models/Group");
const Rating = require("./models/Rating");
//associations could go here!

Group.belongsTo(User, { as: "owner" });
Group.belongsToMany(User);
User.belongsToMany(Group);

Snack.belongsToMany(User, { through: Rating });
User.belongsToMany(Snack, { through: Rating });

module.exports = {
	db,
	models: {
		User,
		Snack,
		Group,
		Rating,
	},
};
