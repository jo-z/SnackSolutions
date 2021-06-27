import axios from "axios";
const token = window.localStorage.getItem("token");

//action types
const SET_MEMBERSHIP_STATUS = "SET MEMBERSHIP STATUS";

//action creators
const setMembershipStatus = (membership) => ({
	type: SET_MEMBERSHIP_STATUS,
	membership,
});

//thunks
export const getMembershipStatus = (groupId) => {
	return async (dispatch) => {
		try {
			const membership = (
				await axios.get(`/api/membership/${groupId}`, {
					headers: { authorization: token },
				})
			).data;
			console.log(membership);
			dispatch(setMembershipStatus(membership));
		} catch (err) {
			console.error(err);
		}
	};
};

//reducer
export default function (state = {}, action) {
	switch (action.type) {
		case SET_MEMBERSHIP_STATUS:
			return action.membership;
		default:
			return state;
	}
}
