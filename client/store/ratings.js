import axios from "axios";
const token = window.localStorage.getItem("token");

//action types
const SET_USERS_RATINGS = "SET_USERS_RATINGS";
const UPDATE_RATING = "UPDATE_RATING";

//action creators
const setUsersRatings = (ratings) => ({ type: SET_USERS_RATINGS, ratings });
const _updateRating = (rating) => ({ type: UPDATE_RATING, rating });

//thunks
export const getUsersRatings = () => {
	return async (dispatch) => {
		try {
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

export const updateRating = (snackId, rating) => {
	return async (dispatch) => {
		try {
			const updatedRating = (
				await axios.put(
					`/api/rating/${snackId}`,
					{ rating },
					{ headers: { authorization: token } }
				)
			).data;
			dispatch(_updateRating(updatedRating));
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
		case UPDATE_RATING:
			return state.map((val) => {
				if (val.id == action.rating.snackId) {
					return { ...val, rating: action.rating };
				} else return val;
			});
		default:
			return state;
	}
}
