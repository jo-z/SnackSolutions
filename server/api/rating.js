const router = require("express").Router();
const {
	models: { Rating, User, Snack },
} = require("../db");
const { Op } = require("sequelize");
const { requireToken } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/rating

//get routes
router.get("/unrated", requireToken, async (req, res, next) => {
	try {
		const snacks = await Snack.findAll({
			include: {
				model: User,
				where: {
					id: req.user.id,
				},
				required: false,
				attributes: [],
			},
		});
		res.send(snacks);
	} catch (err) {
		console.error(err);
	}
});

router.get("/", requireToken, async (req, res, next) => {
	try {
		const ratings = await User.findByPk(req.user.id, {
			include: {
				model: Snack,
			},
			attributes: [],
		});
		res.json(ratings.snacks);
	} catch (err) {
		next(err);
	}
});

//put routes
router.put("/:snackId", requireToken, async (req, res, next) => {
	try {
		let rating = await Rating.findOne({
			where: {
				snackId: req.params.snackId,
				userId: req.user.id,
			},
		});
		if (rating === null) {
			const user = await User.findByPk(req.user.id);
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
});
