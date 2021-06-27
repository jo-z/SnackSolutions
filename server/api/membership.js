const router = require("express").Router();
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/membership

router.get("/:groupId", requireToken, async (req, res, next) => {
	try {
		const group = (
			await req.user.getGroups({ where: { id: req.params.groupId } })
		)[0];
		let membership = {};
		if (group)
			membership = { isMember: true, isOwner: group.member.isOwner };
		else membership = { isMember: false, isOwner: false };
		res.json(membership);
	} catch (err) {
		next(err);
	}
});
