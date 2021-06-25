export default (users, maxSnacks) => {
	const peopleSatisfiedMatrix = [];
	for (let i = 0; i <= users[0].snacks.length; i++) {
		peopleSatisfiedMatrix.push([{ peopleSatisfied: [], snacks: [] }]);
	}
	for (let i = 1; i <= maxSnacks; i++) {
		peopleSatisfiedMatrix[0][i] = { peopleSatisfied: [], snacks: [] };
	}
	console.log(peopleSatisfiedMatrix);
};
