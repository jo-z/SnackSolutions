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
		return (
			<div>
				{groups.map((group) => (
					<Link to={`/groups/${group.id}`} key={group.id}>
						{group.name}
					</Link>
				))}
				<GroupFrom type={CREATE} />
			</div>
		);
	}
}

const mapState = (state) => ({ groups: state.groups });
const mapDispatch = (dispatch) => ({
	getGroups: () => dispatch(getGroupList()),
});

export default connect(mapState, mapDispatch)(GroupList);
