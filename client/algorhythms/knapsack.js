export default (users, maxSnacks) => {
	const peopleSatisfiedMatrix = [];
	for (let i = 0; i <= users[0].snacks.length; i++) {
		peopleSatisfiedMatrix.push([{ peopleSatisfied: 0 }]);
	}
	for (let i = 1; i <= maxSnacks; i++) {
		peopleSatisfiedMatrix[0][i] = { peopleSatisfied: 0 };
	}
	console.log(peopleSatisfiedMatrix);
};
