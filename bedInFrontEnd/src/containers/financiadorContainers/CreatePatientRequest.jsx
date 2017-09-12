import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../redux/store';
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
		let selectedSex = document.getElementById("sexSelect").value //e.target.sexo.value;
		let selectedComplexity = document.getElementById("complexitySelect").value //e.target.complejidad.value;
		let selectedPlan = document.getElementById("planSelect").value //e.target.plan.value;
		let observation = document.getElementById("obs").value // e.target.obs.value;
    this.props.createPatientRequest({
      	dni: document.getElementById("dni").value, //e.target.dni.value,
      	age: document.getElementById("edad").value, //e.target.edad.value,
      	sex: selectedSex,
		cie10: document.getElementById("cie").value, //e.target.cie.value,
		complexity: selectedComplexity,
		healthcareplan: selectedPlan,
		userCreator : store.getState().authentication.userId,
		obs : observation
    })
		document.getElementById("dni").value	   ='';
		document.getElementById("sexSelect").value='---Seleccione Sexo---';
		document.getElementById("edad").value      ='';
		document.getElementById("cie").value       ='';
		document.getElementById("complexitySelect").value='---Seleccione Complejidad---';
		document.getElementById("planSelect").value='---Selecccione Plan---';
		document.getElementById("obs").value       ='';
  }

	createOk(e){
		e.preventDefault();	
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