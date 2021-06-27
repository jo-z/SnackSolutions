const {
	models: { User },
} = require("../db");

//store all our functions that will act as middleware between our request and our response and we will use it as we see fit

const requireToken = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const user = await User.findByToken(token);
		req.user = user;
		next();
	} catch (error) {
		next(error);
	}
};

const checkMembership = async (req, res, next) => {
	try {
		const group = (
			await req.user.getGroups({ where: { id: req.params.groupId } })
		)[0];
		let membership = {};
		if (group)
			membership = { isMember: true, isOwner: group.member.isOwner };
		else membership = { isMember: false, isOwner: false };
		req.group = group;
		req.membership = membership;
		next();
	} catch (err) {
		next(err);
	}
};
const isAdmin = (req, res, next) => {
	//if we managed to make it past require token, we can guarantee we have a user
	//we have access to req.user
	if (!req.user.isAdmin) {
		res.status(403).send("Gotta be an admin, buddy!");
	}
	//if my user IS an admin, they can move forward...
	next();
};

module.exports = {
	requireToken,
	isAdmin,
	checkMembership,
};
