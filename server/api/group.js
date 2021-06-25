const router = require("express").Router();
const {
	models: { Group, User, Snack, Rating },
} = require("../db");
// const {
// 	/*requireToken*/
// } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/groups

//get routes:
router.get(
	"/:groupId/ratings",
	/*requireToken*/ async (req, res, next) => {
		try {
			const user = await User.findByPk(req.body.id);
			const group = ( // await req.user.getGroups({
				await user.getGroups({
					where: { id: req.params.groupId },
					// include: { model: User },
				})
			)[0];
			if (!group.id)
				res.status(403).send(
					"You must be a member of a group to view it"
				);
			else {
				const users = await User.findAll({
					attributes: ["id", "username"],
					include: [
						{
							model: Group,
							where: { id: req.params.groupId },
							attributes: [],
						},
						{
							model: Snack,
							attributes: [
								"id",
								"name",
								"isVegan",
								"isKosher",
								"isHalal",
								"isDairyFree",
								"isGlutenFree",
								"isNutFree",
								"isVegetarian",
							],
							through: { attributes: ["rating"] },
						},
					],
				});
				res.send(users);
			}
		} catch (err) {
			next(err);
		}
	}
);

router.get(
	"/:groupId",
	/*requireToken*/ async (req, res, next) => {
		try {
			// const user = await User.findByPk(req.body.id);
			// const group = ( // await req.user.getGroups({
			// 	await user.getGroups({
			// 		where: { id: req.params.groupId },
			// 		// include: { model: User },
			// 	})
			// )[0];
			// if (!group.id)
			// 	res.status(403).send(
			// 		"You must be a member of a group to view it"
			// 	);
			// else res.send(group);
			const group = await Group.findByPk(req.params.groupId, {
				include: { model: User, attributes: ["id", "username"] },
			});
			res.send(group);
		} catch (err) {
			next(err);
		}
	}
);
