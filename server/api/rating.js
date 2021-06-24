const router = require("express").Router();
const {
	models: { Rating },
} = require("../db");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/rating

//post routes
router.post("/:snackId", requireToken, async (req, res, next) => {
	try {
		const rating = await Rating.findOrCreate({
			where: {
				snackId: req.params.snackId,
				userId: req.user.id,
			},
		});
		await rating.update({ rating: req.body.rating });
		await rating.save();
		res.send(rating);
	} catch (err) {
		next(err);
	}
});
