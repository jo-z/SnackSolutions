import React from "react";
import { connect } from "react-redux";
import { setUsersWithRatings } from "../store/users";
import knapsackAlgo from "../algorhythms/knapsack";
import { getMembershipStatus } from "../store/membership";
export class Group extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackMatrix: [],
			snackList: [],
			mostPopularSnack: [],
		};
	}
	componentDidMount() {
		this.props.getMembership(this.props.match.params.groupId);
		console.log(this.props);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.snackMatrix !== this.state.snackMatrix) {
			for (let i = 0; i < this.state.snackMatrix.length - 1; i++) {
				if (
					this.state.snackMatrix[this.state.snackMatrix.length - 1][i]
						.peopleSatisfied.length === this.props.users.length
				) {
					this.setState({
						snackList: this.state.snackMatrix[
							this.state.snackMatrix.length - 1
						][i].snacks.map((val) => val.name),
					});
					break;
				}
			}
			this.setState({
				mostPopularSnack:
					this.state.snackMatrix[this.state.snackMatrix.length - 1][1]
						.snacks[0].name,
			});
		}
		if (prevProps.membership !== this.props.membership) {
			this.props.getUsers(this.props.match.params.groupId);
		}
	}
	render() {
		const users = this.props.users || [];
		const isMember = this.props.membership.isMember || false;
		return isMember ? (
			<div>
				<div className="user-list">
					{users.map((val) => (
						<div className="user" key={val.id}>
							<h2>{val.username}</h2>
						</div>
					))}
				</div>
				<div id="snack-list">
					<p>
						Your group's ideal snack combination is:
						{this.state.snackList.join(", ")}
					</p>
				</div>
				<div>
					<p>
						The most popular snack in your group is:{" "}
						{this.state.mostPopularSnack}
					</p>
				</div>
				<button
					onClick={() => {
						this.setState({ snackMatrix: knapsackAlgo(users, 20) });
					}}
				>
					Find Your Snack Solution!
				</button>
			</div>
		) : (
			<p>You must be a member of a group to view it</p>
		);
	}
}
const mapState = (state) => {
	return { users: state.users, membership: state.membership };
};
const mapDispatch = (dispatch) => {
	return {
		getUsers: (id) => dispatch(setUsersWithRatings(id)),
		getMembership: (groupId) => dispatch(getMembershipStatus(groupId)),
	};
};
export default connect(mapState, mapDispatch)(Group);
