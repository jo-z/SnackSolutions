import axios from "axios";
import { next } from "cheerio/lib/api/traversing";

//action types
const SET_GROUP_LIST = "SET_GROUP_LIST";

//action creators
const setGroupList = (groups) => ({
	type: SET_GROUP_LIST,
	groups,
});

//thunks
export const getGroupList = () => {
	return async (dsipatch) => {
		try {
			const token = window.localStorage.getItem("token");
			const groups = (
				await axios.get("/api/group/", {
					headers: { authorization: token },
				})
			).data;
			dsipatch(setGroupList(groups));
		} catch (err) {
			next(err);
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
