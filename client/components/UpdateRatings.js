import React from "react";
import { connect } from "react-redux";
import { getUsersRatings } from "../store/ratings";
import RatingPanel from "./RatingPanel";

export class Ratings extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.getRatings();
	}
	render() {
		return this.props.ratings.map((val) => {
			return <RatingPanel key={val.id} snack={val} />;
		});
	}
}

const mapState = (state) => ({ ratings: state.ratings });
const mapDispatch = (dispatch) => ({
	getRatings: () => dispatch(getUsersRatings()),
});
export default connect(mapState, mapDispatch)(Ratings);
