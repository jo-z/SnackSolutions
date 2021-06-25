import axios from "axios";

//action types
const GET_USERS_WITH_RATINGS = "GET_USERS_WITH_RATINGS";

//action creators
const getUsersWithRatings = (users) => ({
	type: GET_USERS_WITH_RATINGS,
	users,
});

//thunks
export const setUsersWithRatings = (groupId) => {
	return async (dispatch) => {
		try {
			const users = (
				await axios.get(`/api/group/${groupId}/ratings`, { id: 1 })
			).data;
			dispatch(getUsersWithRatings(users));
		} catch (err) {
			console.error(err);
		}
	};
};
