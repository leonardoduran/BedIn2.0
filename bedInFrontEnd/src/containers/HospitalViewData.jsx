import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/viewHospital';

import TableDataHospital from '../components/bedinViews/TableDataHospital.jsx';

function mapStateToProps(state) {
	return {
		isRequesting : state.viewHospitals.isRequesting,
		hospitals: state.viewHospitals.hospitals
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class HospitalDataView extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.fetchHospitals();
	}

	render() {
		const dataHospitals = 
			(!this.props.hospitals) ? <p>Cargando...</p>
			: <TableDataHospital hospitals = {this.props.hospitals}/>
		return (
			<div>
				{dataHospitals}	
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalDataView);