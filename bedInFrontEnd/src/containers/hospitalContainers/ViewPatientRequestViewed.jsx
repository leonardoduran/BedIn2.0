import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';

import TableViewViewedPatientRequests from '../../components/hospitalViews/TableViewViewedPatientRequests.jsx';

function mapStateToProps(state) {
	return {
		isRequesting : state.patients.isRequesting,
		patients: state.patients.viewedPatientsData
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class ViewViewedPatientRequest extends React.Component {
	constructor(props) {
		super(props);
		this.setState = this.setState.bind(this);
		this.idInterval = null;
	}

	componentWillMount() {
		this.props.fetchGetPatientsByState('Visto');
		this.idInterval = setInterval(() => {
			this.props.fetchGetPatientsByState('Visto');	
		},10000)
	}

	componentWillUnmount() {
		clearInterval(this.idInterval);
	}

	render() {
		let patients = (!this.props.patients) ? <p>Cargando...</p>
		: <TableViewViewedPatientRequests 
			patientsList = {this.props.patients} 
			setState = {this.setState}/>
		return (
			<div>
				{patients}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewViewedPatientRequest);