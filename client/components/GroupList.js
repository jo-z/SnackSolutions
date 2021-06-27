import React from "react";
import { connect } from "react-redux";
import { getGroupList } from "../store/groups";
import Link from "react-router-dom/Link";
import GroupFrom, { CREATE } from "./GroupFrom";

class GroupList extends React.Component {
	componentDidMount() {
		this.props.getGroups();
	}
	render() {
		const groups = this.props.groups || [];
		const users = this.props.users || [];
		return (
			<div id="group-list">
				{groups.map((group) => (
					<Link
						to={`/groups/${group.id}`}
						key={group.id}
						className="group"
					>
						{group.name}
					</Link>
				))}
				{users[0] ? <GroupFrom type={CREATE} /> : ""}
			</div>
		);
	}
}

const mapState = (state) => ({ groups: state.groups, users: state.users });
const mapDispatch = (dispatch) => ({
	getGroups: () => dispatch(getGroupList()),
});

export default connect(mapState, mapDispatch)(GroupList);
