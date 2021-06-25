import React from "react";
import { connect } from "react-redux";
import { setUsersWithRatings } from "../store/users";

export class Group extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.getUsers(1 /*replace with groupId variable later*/);
	}
	render() {
		console.log(this.props);
		const users = this.props.users || [];
		return (
			<div className="user-list">
				{users.map((val) => (
					<div className="user" key={val.id}>
						<h2>{val.username}</h2>
					</div>
				))}
			</div>
		);
	}
}
const mapState = (state) => {
	return { users: state.users };
};
const mapDispatch = (dispatch) => {
	return {
		getUsers: (id) => dispatch(setUsersWithRatings(id)),
	};
};
export default connect(mapState, mapDispatch)(Group);
