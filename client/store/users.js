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
			const token = window.localStorage.getItem("token");
			const users = (
				await axios.get(`/api/group/${groupId}/ratings`, {
					headers: { authorization: token },
				})
			).data;
			users.sort((a, b) => a.id - b.id);
			users.forEach((val) => {
				val.snacks.sort((a, b) => a.id - b.id);
			});
			dispatch(getUsersWithRatings(users));
		} catch (err) {
			console.error(err);
		}
	};
};

//reducer
export default function (state = [], action) {
	switch (action.type) {
		case GET_USERS_WITH_RATINGS:
			return action.users;
		default:
			return state;
	}
}
