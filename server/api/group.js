const router = require("express").Router();
const {
	models: { Group, User, Snack },
} = require("../db");
const { requireToken, checkMembership } = require("./gatekeepingMiddleware");
module.exports = router;

//mounted on /api/groups

//get routes:
router.get(
	"/:groupId/ratings",
	requireToken,
	checkMembership,
	async (req, res, next) => {
		try {
			if (!req.membership.isMember)
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
							attributes: ["name"],
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
					order: [
						["id", "ASC"],
						[{ model: Snack }, "id", "ASC"],
					],
				});
				res.send(users);
			}
		} catch (err) {
			next(err);
		}
	}
);

router.get("/", requireToken, async (req, res, next) => {
	try {
		const groups = await req.user.getGroups();
		res.json(groups);
	} catch (err) {
		next(err);
	}
});

//put routes
router.put(
	"/addMember/:groupId",
	requireToken,
	checkMembership,
	async (req, res, next) => {
		try {
			if (req.membership.isOwner) {
				const member = await User.findOne({
					where: { username: req.body.name },
					order: [[{ model: Snack }, "id", "ASC"]],
					attributes: ["id", "username"],
					include: [
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
				await member.addGroup(req.group);
				res.json(member);
			} else
				res.status(403).json(
					"You must be the group's owner to add members"
				);
		} catch (err) {
			next(err);
		}
	}
);
router.put(
	"/:groupId",
	requireToken,
	checkMembership,
	async (req, res, next) => {
		try {
			if (req.membership.isOwner) {
				await req.group.update({ name: req.body.name });
				res.json(req.group);
			} else
				res.status("403").send("You must be an owner to edit a group");
		} catch (err) {
			next(err);
		}
	}
);

//post routes
router.post("/", requireToken, async (req, res, next) => {
	try {
		const newGroup = await Group.create({ name: req.body.name });
		newGroup.addUser(req.user, { through: { isOwner: true } });
		console.log(newGroup);
		res.json(newGroup);
	} catch (err) {
		next(err);
	}
});
