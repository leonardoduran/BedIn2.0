import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../redux/actions/hospitalActions/patients';
import TableViewAcceptedPatientRequests from '../../components/hospitalViews/TableViewAcceptedPatientRequests.jsx';

function mapStateToProps(state) {
	return {
		isRequesting : state.patients.isRequesting,
		patients: state.patients.acceptedPatientsData
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class ViewAcceptedPatientRequest extends React.Component {
	constructor(props) {
		super(props);
		this.setState = this.setState.bind(this);
		this.idInterval = null;
	}

	componentDidMount() {
		this.props.fetchGetPatientsByState('Aceptado');
		this.idInterval = setInterval(() => {
			this.props.fetchGetPatientsCheck(false);
			this.props.fetchGetPatientsByState('Aceptado');	
		},1000*10)
	}

	componentWillUnmount() {
		clearInterval(this.idInterval);
	}

	render() {
		let patients = (!this.props.patients) ? <p>Cargando...</p>
		: <TableViewAcceptedPatientRequests 
			patientsList = {this.props.patients} 
			setState = {this.setState}/>			
		return (
			<div>
				{patients}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAcceptedPatientRequest);