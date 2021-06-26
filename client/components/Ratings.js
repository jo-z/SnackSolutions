import React from "react";
import { connect } from "react-redux";
import { getUsersRatings } from "../store/ratings";

export class Ratings extends React.Component {
	render() {
		return <p>hello!</p>;
	}
}

const mapState = (state) => ({ ratings: state.ratings });
const mapDispatch = (dispatch) => ({
	getRatings: () => dispatch(getUsersRatings()),
});
export default connect(mapState, mapDispatch)(Ratings);
