import axios from "axios";
import { UPDATE_GROUP } from "./groups";
const token = window.localStorage.getItem("token");
const authorization = {
	headers: { authorization: token },
};

//action types
const GET_USERS_WITH_RATINGS = "GET_USERS_WITH_RATINGS";
const ADD_USER_TO_GROUP = "ADD USER TO GROUP";

//action creators
const getUsersWithRatings = (users) => ({
	type: GET_USERS_WITH_RATINGS,
	users,
});
const _addUserToGroup = (user) => ({
	type: ADD_USER_TO_GROUP,
	user,
});

//thunks
export const setUsersWithRatings = (groupId) => {
	return async (dispatch) => {
		try {
			const users = (
				await axios.get(`/api/group/${groupId}/ratings`, authorization)
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
export const addUserToGroup = (groupId, name) => {
	return async (dispatch) => {
		try {
			const user = (
				await axios.put(
					`/api/group/addMember/${groupId}`,
					{ name },
					authorization
				)
			).data;
			dispatch(_addUserToGroup(user));
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
		case ADD_USER_TO_GROUP:
			return [...state, action.user];
		case UPDATE_GROUP:
			return state.map((val) => {
				val.groups[0] = action.group;
				return val;
			});
		default:
			return state;
	}
}
