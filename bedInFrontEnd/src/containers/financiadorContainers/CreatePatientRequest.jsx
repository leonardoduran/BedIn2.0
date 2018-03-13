import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import store from '../../redux/store';
import * as actionCreators from '../../redux/actions/financiadorActions/patientRequestCreateView';

import CreatePatientRequestForm from '../../components/financiadorViews/CreatePatientRequestForm.jsx';

// import Autosuggest from 'react-autosuggest';

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
		  plans: state.patientRequestReducers.plans ,
		  error: state.patientRequestReducers.error,
		// diagnosisSuggest: state.patientRequestReducers.diagnosis,
		// valueDiagnosisSuggest : state.patientRequestReducers.diagnosisSuggest
  }
};

// const diagnosis=[]

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

// const getSuggestions = value => {
//   const inputValue = value.trim().toLowerCase();
//   const inputLength = inputValue.length;

//   return inputLength === 0 ? [] : this.props.diagnosisSuggest.filter(diag =>
//     diag.pathology.toLowerCase().slice(0, inputLength) === inputValue
//   );
// };

// const getSuggestionValue = suggestion => suggestion.pathology;

// // Use your imagination to render suggestions.
// const renderSuggestion = suggestion => (
//   <div>
//         {suggestion.pathology}
//   </div>
// );

class CreatePatientRequest extends React.Component {
	constructor(props) {
		super(props);
		this.create = this.create.bind(this)
		this.createOk = this.createOk.bind(this)
    this.changePlan=this.changePlan.bind(this)
		// this.onChange = this.onChange.bind(this)
		// this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
		// this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    	// this.state = {
     //  		value: '',
     //  		suggestions: []
    	// }		
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
// console.log(this.state.diagnosis)
// console.log(this.state.sugg.value)
// return
		let selectedSex = document.getElementById("sexSelect").value //e.target.sexo.value;
		let selectedComplexity = document.getElementById("complexitySelect").value //e.target.complejidad.value;
		let selectedPlan = document.getElementById("planSelect").value //e.target.plan.value;
		let observation = document.getElementById("obs").value // e.target.obs.value;
    let edad = document.getElementById("edad").value;
    let patient = document.getElementById("dni").value;
    let diagnosis = document.getElementById("cie").value;
    let planExt = document.getElementById("planExterno").value;

    	if(selectedPlan=="---Selecccione Plan---"){
    		alert("No se seleccinó plan");
    		document.getElementById("planSelect").focus();
    		return;
    	}

       let selectedPlanName = document.getElementById("planSelect")[document.getElementById("planSelect").selectedIndex].text;
          if (selectedPlanName.toLowerCase() == "externo" && planExt== ''){
            alert("Plan externo no ingresado");
            document.getElementById("planExterno").focus();
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
    			obs : observation,
          planExterno :planExt.toUpperCase()
        })
          
		document.getElementById("dni").value	   ='';
		document.getElementById("sexSelect").value='---Seleccione Sexo---';
		document.getElementById("edad").value      ='';
		document.getElementById("cie").value       ='';
		document.getElementById("complexitySelect").value='---Seleccione Complejidad---';
		document.getElementById("planSelect").value='---Selecccione Plan---';
		document.getElementById("obs").value       ='';
    document.getElementById("planExterno").value='';
    document.getElementById("planExterno").style.visibility = "hidden";
  }

	createOk(e){
		e.preventDefault();	
		this.props.resetCreateSuccess();
	}

  changePlan(){
      let selectedPlan = document.getElementById("planSelect")[document.getElementById("planSelect").selectedIndex].text;
          if (selectedPlan.toLowerCase() == "externo")
            document.getElementById("planExterno").style.visibility = "visible";
            
          else
            {
              document.getElementById("planExterno").style.visibility = "hidden";
              document.getElementById("planExterno").value= "";
            }
  }


	componentWillUnmount() {
    this.props.resetCreateSuccess();
  }
	
 	// onChange (event, { newValue }) {
  //   	this.setState({
  //     		value: newValue
  //   	});
  // 	}

  // onSuggestionsFetchRequested ({ value }) {
  //   this.setState({
  //     suggestions: getSuggestions(value)
  //   });
  // };

  // // Autosuggest will call this function every time you need to clear suggestions.
  // onSuggestionsClearRequested ()  {
  //   this.setState({
  //     suggestions: []
  //   });
  // };


	render() {
    	// // const suggestions = this.props.diagnosisSuggest;
    	// // const value       = this.props.valueDiagnosisSuggest;
    	// const { value, suggestions } = this.state;
    	// // Autosuggest will pass through all these props to the input.
    	// const inputProps = {
     //  		placeholder: 'Type a programming language',
     //  		value,
     //  		onChange: this.onChange
    	// };
		return (
			<div>
			<CreatePatientRequestForm 
        plans={this.props.plans} 
        createRequest={this.create} 
        success={this.props.createSuccess} 
        createRequestOk={this.createOk} 
        changePlan={this.changePlan}
        />
			</div>

		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatientRequest);


/*
render()
      		<Autosuggest
        		onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        		onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        		suggestions={suggestions}
        		getSuggestionValue={getSuggestionValue}
        		renderSuggestion={renderSuggestion}
        		inputProps={inputProps}
      		/>
*/

/*
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class Example extends React.Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a programming language',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
*/