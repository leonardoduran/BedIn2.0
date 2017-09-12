import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';

import TableViewRejectedPatientRequests from '../../components/hospitalViews/TableViewRejectedPatientRequests.jsx';

function mapStateToProps(state) {
	return {
		isRequesting : state.patients.isRequesting,
		patients: state.patients.rejectedPatientsData
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class ViewRejectedPatientRequest extends React.Component {
	constructor(props) {
		super(props);
		this.setState = this.setState.bind(this);
		this.idInterval = null;
	}

	componentWillMount() {
		this.props.fetchGetPatientsByState('Rechazado');
		this.idInterval = setInterval(() => {
			this.props.fetchGetPatientsByState('Rechazado');	
		},10000)
	}

	componentWillUnmount() {
		clearInterval(this.idInterval);
	}

	render() {
		let patients = (!this.props.patients) ? <p>Cargando...</p>
		: <TableViewRejectedPatientRequests 
			patientsList = {this.props.patients} 
			setState = {this.setState}/>
		return (
			<div>
				{patients}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRejectedPatientRequest);