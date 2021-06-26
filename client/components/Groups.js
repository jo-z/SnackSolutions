import React from "react";
import { connect } from "react-redux";
import { setUsersWithRatings } from "../store/users";
import knapsackAlgo from "../algorhythms/knapsack";
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
		this.props.getUsers(1 /*replace with groupId variable later*/);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.snackMatrix !== this.state.snackMatrix) {
			console.log("state", this.state);
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
	}
	render() {
		// console.log(this.props);
		const users = this.props.users || [];
		// console.log("users", users);

		return (
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
