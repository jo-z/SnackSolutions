import React from "react";
import { connect } from "react-redux";
import { updateRating } from "../store/ratings";

class RatingPanel extends React.Component {
	constructor(props) {
		super(props);
		this.state = { rating: this.props.snack.rating.rating };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	handleSubmit(evt) {
		evt.preventDefault();
		this.props.updateRating(this.props.snack.id, this.state.rating);
	}
	render() {
		const snack = this.props.snack;
		return (
			<div className="rating-panel">
				<div>
					<h3>{snack.name}</h3>
				</div>
				<div>
					<form id="update-snack-form" onSubmit={this.handleSubmit}>
						<label htmlFor="rating">Rating:</label>
						<input
							name="rating"
							value={this.state.rating}
							onChange={this.handleChange}
							type="number"
							min="1"
							max="5"
							step="1"
						/>
						<button type="submit">update</button>
					</form>
				</div>
			</div>
		);
	}
}

const mapDispatch = (dispatch) => ({
	updateRating: (snackId, rating) => dispatch(updateRating(snackId, rating)),
});
export default connect(null, mapDispatch)(RatingPanel);
