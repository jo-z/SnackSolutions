const { User } = require("../db");

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
};
