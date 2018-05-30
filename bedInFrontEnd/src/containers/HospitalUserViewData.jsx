import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/viewUser';

import TableDataUserHospital from '../components/bedinViews/TableDataUserHospital.jsx';

function mapStateToProps(state) {
	return {
		usersHospital : state.viewUser.users,
		isRequesting: state.viewUser.isRequesting
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class HospitalUserViewData extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.fetchGetUsersByType('Hospital');
	}

	render() {
		const dataUserHospital = (this.props.usersHospital === null) 
		? <p>Cargando...</p>
		: <TableDataUserHospital users = {this.props.usersHospital}/> 
		return (
			<div>
				{dataUserHospital}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalUserViewData);