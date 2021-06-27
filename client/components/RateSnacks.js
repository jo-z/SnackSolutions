import React from "react";
import { connect } from "react-redux";
import { getUnratedSnacks } from "../store/unratedSnacks";
import RatingPanel from "./RatingPanel";

class RateSnacks extends React.Component {
	componentDidMount() {
		this.props.getUnratedSnacks();
	}
	render() {
		const snacks = this.props.snacks || [];
		return snacks.map((val) => {
			return (
				<RatingPanel
					key={val.id}
					snack={{ ...val, rating: { rating: null } }}
				/>
			);
		});
	}
}

const mapState = (state) => ({ snacks: state.unratedSnacks });
const mapDispatch = (dispatch) => ({
	getUnratedSnacks: () => dispatch(getUnratedSnacks()),
});
export default connect(mapState, mapDispatch)(RateSnacks);
