import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../redux/actions/financiadorActions/patientRequestCreateView';

import CreatePatientRequestForm from '../../components/financiadorViews/CreatePatientRequestForm.jsx';


function mapStateToProps(state) {
  return {
		isRequesting: state.patientRequestReducers.isRequesting,
	  createSuccess: state.patientRequestReducers.createSuccess,
	  dni: state.patientRequestReducers.dni,
	  age: state.patientRequestReducers.age,
	  sex: state.patientRequestReducers.sex,
	  cie10: state.patientRequestReducers.cie10,
	  complexity: state.patientRequestReducers.complexity,
	  patientPlan: state.patientRequestReducers.patientPlan,
	  dateCreated: state.patientRequestReducers.dateCreated,
	  hospitalsRequested: state.patientRequestReducers.hospitalsRequested,
		plans: state.patientRequestReducers.plans,
		error: state.patientRequestReducers.error
  }
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}


class CreatePatientRequest extends React.Component {
	constructor(props) {
		super(props);
		this.create = this.create.bind(this)
		this.createOk = this.createOk.bind(this)
	}

	componentWillMount() {
    this.props.fetchPlanList();
  }

	create(e) {
		e.preventDefault();
		let selectedSex = e.target.sexo.value;
		let selectedComplexity = e.target.complejidad.value;
		let selectedPlan = e.target.plan.value;

    this.props.createPatientRequest({
      dni: e.target.dni.value,
      age: e.target.edad.value,
      sex: selectedSex,
			cie10: e.target.cie.value,
			complexity: selectedComplexity,
			healthcareplan: selectedPlan
    })
  }

	createOk(e){
		e.preventDefault();
debugger;		
		document.getElementById("dni").value	   ='';
		document.getElementById("sexSelect").value='---Seleccione Sexo---';
		document.getElementById("edad").value      ='';
		document.getElementById("cie").value       ='';
		document.getElementById("complexitySelect").value='---Seleccione Complejidad---';
		document.getElementById("planSelect").value='---Selecccione Plan---';
		this.props.resetCreateSuccess();
	}


	componentWillUnmount() {
    this.props.resetCreateSuccess();
  }
	
	render() {
		return (
			<CreatePatientRequestForm plans={this.props.plans} createRequest={this.create} success={this.props.createSuccess} createRequestOk={this.createOk} />
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatientRequest);