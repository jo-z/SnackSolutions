import axios from "axios";
import { UPDATE_RATING } from "./ratings";
const token = window.localStorage.getItem("token");

//action types
const GET_UNRATED_SNACKS = "GET UNRATED SNACKS";

//action creators
const setUnratedSnacks = (snacks) => ({ type: GET_UNRATED_SNACKS, snacks });

//thunks
export const getUnratedSnacks = () => {
	return async (dispatch) => {
		try {
			const snacks = (
				await axios.get("/api/rating/unrated", {
					headers: { authorization: token },
				})
			).data;
			dispatch(setUnratedSnacks(snacks));
		} catch (err) {
			console.error(err);
		}
	};
};

//reducer
export default function (state = [], action) {
	switch (action.type) {
		case GET_UNRATED_SNACKS:
			return action.snacks;
		case UPDATE_RATING:
			return state.filter((val) => val.id !== action.rating[0].snackId);
		default:
			return state;
	}
}
