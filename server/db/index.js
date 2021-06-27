//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Snack = require("./models/Snack");
const Group = require("./models/Group");
const Rating = require("./models/Rating");
const Member = require("./models/Member");
//associations could go here!

Group.belongsToMany(User, { through: Member });
User.belongsToMany(Group, { through: Member });
Member.belongsTo(User);
Member.belongsTo(Group);

Snack.belongsToMany(User, { through: Rating });
Snack.hasMany(Rating);
User.belongsToMany(Snack, { through: Rating });
Rating.belongsTo(User);
Rating.belongsTo(Snack);

module.exports = {
	db,
	models: {
		User,
		Snack,
		Group,
		Rating,
		Member,
	},
};
