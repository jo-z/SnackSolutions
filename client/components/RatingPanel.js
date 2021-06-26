import React from "react";
import { connect } from "react-redux";
import { updateRating } from "../store/ratings";

class RatingPanel extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const snack = this.props.snack;
		return (
			<div className="rating-panel">
				<div>
					<h3>{snack.name}</h3>
				</div>
				<div>
					<p>rating:{snack.rating.rating}</p>
					<button>update</button>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => ({
	updateRating: (snackId, rating) => dispatch(updateRating(snackId, rating)),
});
export default connect(null, mapDispatch)(RatingPanel);
