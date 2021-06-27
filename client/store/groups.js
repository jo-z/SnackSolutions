import axios from "axios";
const token = window.localStorage.getItem("token");
const authorization = {
	headers: { authorization: token },
};

//action types
const SET_GROUP_LIST = "SET_GROUP_LIST";
export const UPDATE_GROUP = "UPDATE GROUP";

//action creators
const setGroupList = (groups) => ({
	type: SET_GROUP_LIST,
	groups,
});
const _updateGroup = (group) => ({
	type: UPDATE_GROUP,
	group,
});

//thunks
export const getGroupList = () => {
	return async (dsipatch) => {
		try {
			const groups = (await axios.get("/api/group/", authorization)).data;
			dsipatch(setGroupList(groups));
		} catch (err) {
			console.error(err);
		}
	};
};
export const updateGroup = (group) => {
	return async (dispatch) => {
		try {
			const newGroup = (
				await axios.put(
					"/api/group/",
					{ name: group.name },
					authorization
				)
			).data;
			dispatch(_updateGroup(newGroup));
		} catch (err) {
			console.error(err);
		}
	};
};

//reducer
export default function (state = [], action) {
	switch (action.type) {
		case SET_GROUP_LIST:
			return action.groups;
		default:
			return state;
	}
}
