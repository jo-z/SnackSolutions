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
		//query ratings table for userId, find all snacks with ids not in result
		const snackIds = (
			await Rating.findAll({
				where: { userId: req.user.id },
				attributes: ["snackId"],
			})
		).map((val) => val.snackId);
		const snacks = await Snack.findAll({
			where: { id: { [Op.notIn]: snackIds } },
			order: [["id", "ASC"]],
		});
		res.send(snacks);
	} catch (err) {
		next(err);
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
