const userData = require("./rawUserData");
const snackData = require("./rawSnackData");
const ratingData = require("./rawRatingData");
const {
	db,
	models: { User, Snack, Rating, Group, Member },
} = require("../index");

const seed = async () => {
	try {
		await db.sync({ force: true });
		// seed your database here!
		const users = await Promise.all(
			userData.map((user) => User.create(user))
		);

		const snacks = await Promise.all(
			snackData.map((snack) => Snack.create(snack))
		);

		const group = await Group.create({ name: "Test Group" });
		await Promise.all(users.map((user) => group.addUser(user)));
		const firstMember = await Member.findOne();
		await firstMember.update({ isOwner: true });
		{
			//making a closure to use i and j in the map
			let i = -1;
			let j = -1;
			await Promise.all(
				ratingData.map((rating) => {
					i++;
					i = i % users.length;
					if (i === 0) {
						j++;
						j % snacks.length;
					}
					return Rating.create({
						userId: users[i].id,
						snackId: snacks[j].id,
						...rating,
					});
				})
			);
		}
	} catch (err) {
		console.error(err);
	}
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
	seed()
		.then(() => {
			console.log("Seeding success!");
			db.close();
		})
		.catch((err) => {
			console.error("Dang! Something went wrong!");
			console.error(err);
			db.close();
		});
}
