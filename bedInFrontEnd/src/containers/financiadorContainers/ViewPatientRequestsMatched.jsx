import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actions/financiadorActions/patientRequestCreateView';

import TableViewMatchedPatientRequests from '../../components/financiadorViews/TableViewMatchedPatientRequests.jsx';


function mapStateToProps(state) {
  return {
		isRequesting: state.patientRequestReducers.isRequesting,
		matchedList: state.patientRequestReducers.matchedList,
		error: state.patientRequestReducers.error
  }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}


class ViewPatientRequestsMatched extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.fetchMatchedPatientRequests();
		this.idInterval = setInterval(() => {
			this.props.fetchMatchedPatientRequests();
		},10000)
	}

	componentWillUnmount() {
		clearInterval(this.idInterval)
	}

	render() {
    const tableRequests = this.props.isRequesting ? <p>Cargando..</p>
    : <TableViewMatchedPatientRequests patients = {this.props.matchedList}/>
		return (
			<div>
				{tableRequests}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPatientRequestsMatched);