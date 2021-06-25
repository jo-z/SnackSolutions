import React from "react";
import { connect } from "react-redux";
import { setUsersWithRatings } from "../store/users";
import knapsackAlgo from "../algorhythms/knapsack";
export class Group extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackList: [],
		};
	}
	componentDidMount() {
		this.props.getUsers(1 /*replace with groupId variable later*/);
	}
	render() {
		console.log(this.props);
		const users = this.props.users || [];
		console.log("users", users);

		return (
			<div className="user-list">
				{users.map((val) => (
					<div className="user" key={val.id}>
						<h2>{val.username}</h2>
					</div>
				))}
				<div id="snack-list">
					<p>Your group's ideal snacks are:</p>
					{this.state.snackList.map((val) => (
						<div key={val.id}>{val.join(", ")}</div>
					))}
				</div>
				<button onClick={() => knapsackAlgo(users, 20)}>
					Find Your Snack Solution!
				</button>
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
