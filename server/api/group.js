const router = require("express").Router();
const {
	models: { Group, User, Rating },
} = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/groups

//get routes:
router.get("/:groupId", requireToken, async (req, res, next) => {
	try {
		const group = await req.user.getGroups({
			where: { groupId: req.params.groupId },
			include: { model: User },
		});
		if (!group.length)
			res.status(403).send("You must be a member of a group to view it");
		else res.send(group[0]);
	} catch (err) {
		next(err);
	}
});
