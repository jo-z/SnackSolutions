import React from "react";
import { connect } from "react-redux";
import { addUserToGroup, setUsersWithRatings } from "../store/users";
import knapsackAlgo from "../algorhythms/knapsack";
import { getMembershipStatus } from "../store/membership";
import { EDIT } from "./GroupForm";
import GroupForm from "./GroupForm";
export class Group extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			snackMatrix: [],
			snackList: [],
			mostPopularSnack: [],
			name: "",
			maxSnacks: 20,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	handleSubmit(evt) {
		evt.preventDefault();
		this.props.addUser(this.props.match.params.groupId, this.state.name);
	}
	componentDidMount() {
		this.props.getMembership(this.props.match.params.groupId);
		console.log(this.props);
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.snackMatrix !== this.state.snackMatrix) {
			for (let i = 0; i <= this.state.maxSnacks; i++) {
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
		const users = this.props.users || [{ groups: [{}] }];
		const isMember = this.props.membership.isMember || false;
		const isOwner = this.props.membership.isOwner || false;

		// const name = users[0].groups[0].name || "";
		return isMember ? (
			<div>
				{users[0] ? <h2>{users[0].groups[0].name}</h2> : ""}
				<div className="user-list">
					{users.map((val) => (
						<div className="user" key={val.id}>
							<h2>{val.username}</h2>
						</div>
					))}
				</div>
				{isOwner ? (
					<form id="add-user-form" onSubmit={this.handleSubmit}>
						<label htmlFor="name">Username</label>
						<input
							name="name"
							value={this.state.name}
							onChange={this.handleChange}
							required
						/>
						<button type="submit">Add user</button>
					</form>
				) : (
					""
				)}
				<div id="snack-list">
					<p>
						Your group's ideal snack combination is:
						{this.state.snackList.join(", ")}
					</p>
				</div>
				<div id="most-popular-snack">
					<p>
						The most popular snack in your group is:{" "}
						{this.state.mostPopularSnack}
					</p>
				</div>

				<label htmlFor="maxSnacks">Max number of Snacks:</label>
				<input
					name="maxSnacks"
					value={this.state.maxSnacks}
					onChange={this.handleChange}
					type="number"
					min="1"
					step="1"
				/>

				<button
					onClick={() => {
						this.setState({
							snackMatrix: knapsackAlgo(
								users,
								this.state.maxSnacks
							),
						});
					}}
					id="snack-solution-button"
				>
					Find Your Snack Solution!
				</button>
				{users[0] && isOwner ? (
					<GroupForm
						type={EDIT}
						groupId={this.props.match.params.groupId}
					/>
				) : (
					""
				)}
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
		addUser: (groupId, name) => dispatch(addUserToGroup(groupId, name)),
	};
};
export default connect(mapState, mapDispatch)(Group);
