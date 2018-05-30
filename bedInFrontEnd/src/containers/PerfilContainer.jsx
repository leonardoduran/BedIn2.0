import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/viewUser';

import UserInformation from '../components/bedinViews/UserInformation.jsx';

function mapStateToProps(state) {
	return {
		users: state.viewUser.users,
		isRequesting: state.viewUser.isRequesting,
		error: state.viewUser.error
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class PerfilContainer extends React.Component {
	constructor(props) {
		super(props);
		this.changePassword = this.changePassword.bind(this);
	}

	componentDidMount() {
		this.props.fetchGetUserById();
	}

	changePassword() {
		let oldPassword = document.querySelector("#oldPassword").value;
		let newPassword = document.querySelector("#newPassword").value;
		this.props.fetchChangePassword(oldPassword,newPassword)
	}

	render() {
		const error = <p>{this.props.error}</p>
		const userInfo = (!this.props.users) ? <p>Cargando..</p>
		: <UserInformation users={this.props.users}
			changePassword={this.changePassword}/>
		return (
			<div>
				{userInfo}
				{error}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilContainer);