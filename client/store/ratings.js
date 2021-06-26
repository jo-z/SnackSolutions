import axios from "axios";

//action types
const SET_USERS_RATINGS = "SET_USERS_RATINGS";

//action creators
const setUsersRatings = (ratings) => ({ type: SET_USERS_RATINGS, ratings });

//thunks
export const getUsersRatings = () => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem("token");
			const ratings = (
				await axios.get("/api/rating", {
					headers: { authorization: token },
				})
			).data;
			dispatch(setUsersRatings(ratings));
		} catch (err) {
			console.error(err);
		}
	};
};

//reducer
export default function (state = [], action) {
	switch (action.type) {
		case SET_USERS_RATINGS:
			return action.ratings;
		default:
			return state;
	}
}
