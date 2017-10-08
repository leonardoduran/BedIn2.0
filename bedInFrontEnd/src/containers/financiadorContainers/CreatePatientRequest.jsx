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
		error: state.patientRequestReducers.error,
		diagnosis: state.patientRequestReducers.diagnosis
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
    	this.props.fetchDiagnosis();
  	}
   	
   	validDiagnosis(aDiagnosis){
    	//Valido que sea un diagnóstico que exista en los predefinidos
    	return true
  	}
	
	create(e) {
		e.preventDefault();
		let selectedSex = document.getElementById("sexSelect").value //e.target.sexo.value;
		let selectedComplexity = document.getElementById("complexitySelect").value //e.target.complejidad.value;
		let selectedPlan = document.getElementById("planSelect").value //e.target.plan.value;
		let observation = document.getElementById("obs").value // e.target.obs.value;
    	let edad = document.getElementById("edad").value;
    	let patient = document.getElementById("dni").value;
    	let diagnosis = document.getElementById("cie").value;

    	if(selectedPlan=="---Selecccione Plan---"){
    		alert("No se seleccinó plan");
    		document.getElementById("planSelect").focus();
    		return;
    	}
    	if(edad=='' || isNaN(edad) || edad<0){
    		alert("Edad no ingresada o no válida");
    		document.getElementById("edad").focus();
    		return;
    	}

    	if(patient==''){
    		alert("No se ingresó el paciente");
    		document.getElementById("dni").focus();
    		return;
    	}

    	if(selectedSex=='---Seleccione Sexo---'){
    		alert("No se seleccinó sexo");
    		document.getElementById("sexSelect").focus();
    		return;
    	}

    	if(selectedComplexity == '---Seleccione Complejidad---'){
    		alert("No se seleccinó complejidad");
    		document.getElementById("complexitySelect").focus();
    		return;
    	}

    	if(diagnosis=='' || !this.validDiagnosis(diagnosis)){
    		alert("Diagnóstico no ingresado o no válido");
    		document.getElementById("cie").focus();
    		return;
    	}

    	this.props.createPatientRequest({
	      	dni: patient,
	      	age: edad,
	      	sex: selectedSex,
			cie10: diagnosis,
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