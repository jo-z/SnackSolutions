const router = require("express").Router();
const {
	models: { Rating, User, Snack },
} = require("../db");
// const { /*requireToken*/ } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/rating

//put routes
router.put(
	"/:snackId",
	/*requireToken*/ async (req, res, next) => {
		try {
			let rating = await Rating.findOne({
				where: {
					snackId: req.params.snackId,
					// userId: req.user.id,
					userId: req.body.id,
				},
			});
			if (rating === null) {
				const user = await User.findByPk(req.body.id);
				const snack = await Snack.findByPk(req.params.snackId);
				rating = await user.addSnack(snack, {
					through: { rating: req.body.rating },
				});
			} else {
				await rating.update({ rating: req.body.rating });
			}
			res.send(rating);
		} catch (err) {
			next(err);
		}
	}
);
