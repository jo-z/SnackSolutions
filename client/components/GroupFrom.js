import React from "react";
import { connect } from "react-redux";

export const CREATE = "Create";
export const EDIT = "Edit";

class GroupForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}
	handleSubmit(evt) {
		evt.preventDefault();
		if (this.props.type === CREATE) {
			// this.props.createCampus(this.state);
			this.setState({
				name: "",
			});
		} else if (this.props.type === EDIT) {
			// this.props.editCampus(this.state);
		}
	}
	componentDidMount() {
		if (this.props.type === EDIT) {
			//fix this
			const newState = { name: this.props.name };
			this.setState(newState);
		}
	}
	render() {
		const { name, address, imageUrl, description } = this.state;
		return (
			<form id="group-form" onSubmit={this.handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					name="name"
					value={name}
					onChange={this.handleChange}
					required
				/>
				<button type="submit">Submit</button>
			</form>
		);
	}
}

const mapState = (state) => {
	return {
		name: state.users[0].groups[0].name,
	};
};
const mapDispatch = (dispatch) => {
	return {
		// createCampus: (campus) => dispatch(createCampus(campus)),
		// editCampus: (campus) => dispatch(editCampus(campus)),
	};
};
export default connect(mapState, mapDispatch)(GroupForm);
