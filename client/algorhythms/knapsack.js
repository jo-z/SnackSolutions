export default (users, maxSnacks, threshold = 5) => {
	console.log(users);
	const peopleSatisfiedMatrix = [];
	for (let row = 0; row <= users[0].snacks.length; row++) {
		peopleSatisfiedMatrix.push([
			{ peopleSatisfied: [], peopleUnsatisfied: [...users], snacks: [] },
		]);
	}
	for (let col = 1; col <= maxSnacks; col++) {
		peopleSatisfiedMatrix[0][col] = {
			peopleSatisfied: [],
			peopleUnsatisfied: [...users],
			snacks: [],
		};
	}
	for (let row = 1; row <= users[0].snacks.length; row++) {
		for (let col = 1; col <= maxSnacks; col++) {
			let holder = peopleSatisfiedMatrix[row - 1][col];
			const SatisfiedWithoutSnack = {
				peopleSatisfied: [...holder.peopleSatisfied],
				peopleUnsatisfied: [...holder.peopleUnsatisfied],
				snacks: [...holder.snacks],
			};
			holder = peopleSatisfiedMatrix[row - 1][col - 1];
			const SatisfiedWithSnack = {
				peopleSatisfied: [...holder.peopleSatisfied],
				peopleUnsatisfied: [...holder.peopleUnsatisfied],
				snacks: [...holder.snacks],
			};
			SatisfiedWithSnack.peopleSatisfied =
				SatisfiedWithSnack.peopleSatisfied.concat(
					SatisfiedWithSnack.peopleUnsatisfied.filter(
						(val) => val.snacks[row - 1].rating.rating >= threshold
					)
				);
			if (
				SatisfiedWithSnack.peopleSatisfied.length >
				SatisfiedWithoutSnack.peopleSatisfied.length
			) {
				SatisfiedWithSnack.peopleUnsatisfied =
					SatisfiedWithSnack.peopleUnsatisfied.filter(
						(val) => val.snacks[row - 1].rating.rating < threshold
					);
				SatisfiedWithSnack.snacks.push({
					id: users[0].snacks[row - 1].id,
					name: users[0].snacks[row - 1].name,
				});
				peopleSatisfiedMatrix[row][col] = SatisfiedWithSnack;
			} else peopleSatisfiedMatrix[row][col] = SatisfiedWithoutSnack;
		}
	}
	console.log(peopleSatisfiedMatrix);
};
