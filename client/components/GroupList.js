import React from "react";
import { connect } from "react-redux";
import { getGroupList } from "../store/groups";

class GroupList extends React.Component {
	render() {
		return <p>hello!!</p>;
	}
}

const mapState = (state) => ({ groups: state.groups });
const mapDispatch = (dispatch) => ({
	getGroups: () => dispatch(getGroupList()),
});

export default connect(mapState, mapDispatch)(GroupList);
