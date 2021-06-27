const router = require("express").Router();
const { requireToken, checkMembership } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/membership

router.get(
	"/:groupId",
	requireToken,
	checkMembership,
	async (req, res, next) => {
		try {
			res.json(req.membership);
		} catch (err) {
			next(err);
		}
	}
);
