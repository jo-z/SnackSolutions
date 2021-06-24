const router = require("express").Router();
const {
	models: { Snack },
} = require("../db");
module.exports = router;

//mounted on /api/snacks

//get methods
router.get("/", async (req, res, next) => {
	try {
		const snacks = await Snack.findAll({
			attributes: [
				"name",
				"isVegan",
				"isKosher",
				"isHalal",
				"isVegetarian",
				"isGlutenFree",
				"isDairyFree",
				"isNutFree",
			],
		});
		res.send(snacks);
	} catch (err) {
		next(err);
	}
});
