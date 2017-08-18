import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/formActions';

import FinanciadorFormStep1 from '../components/bedinViews/FinanciadorFormStep1.jsx';
import FinanciadorFormStep2 from '../components/bedinViews/FinanciadorFormStep2.jsx';



function mapStateToProps(state) {
  return {
    isRequesting: state.formReducers.isRequesting,
    createSuccess: state.formReducers.createSuccess,
    requestFail: state.formReducers.requestFail,
    error: state.formReducers.error,
    name: state.formReducers.name,
    address: state.formReducers.address,
    phone:  state.formReducers.phone,
    email: state.formReducers.email,
    plans: state.formReducers.plans,
    receiveHospitals: state.formReducers.receiveHospitals,
    hospitals: state.formReducers.hospitals
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}



class FinanciadorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      name: null,
      address: null,
      phone: null,
      email: null,
      planInputs: [],
      hospitalInputs: []
    }
    this.nextStep = this.nextStep.bind(this)
    this.previousStep = this.previousStep.bind(this)
    this.add = this.add.bind(this)
    this.submitAllToStore = this.submitAllToStore.bind(this)
  }

  add(input, checkedHospitals) {
    const array = this.state.planInputs.slice();
    array.push(input);
    const arrayChecked = this.state.hospitalInputs.slice();
    arrayChecked.push(checkedHospitals);
    this.setState({
      planInputs: array,
      hospitalInputs: arrayChecked
    })
  }

  nextStep(e) {
    e.preventDefault();
    this.setState({
      step: this.state.step + 1,
      name: e.target.nombre.value,
      address: e.target.direccion.value,
      phone: e.target.telefono.value,
      email: e.target.email.value
      // Defined and created a local state to locally store form value to later send to store
    })
  }

  previousStep(e) {
    e.preventDefault();
    this.setState({
      step: this.state.step - 1
    })
  }

  submitAllToStore() {
    let dataForBack = []
    for(let i = 0; i < this.state.planInputs.length; i++) {
      dataForBack.push({
        name: this.state.planInputs[i],
        hospitals: this.state.hospitalInputs[i].map(hospital => hospital.id)
      })
    }
    this.props.createEntidadFinanciadora ({
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email,
      plans: dataForBack
    })
  }

  componentWillMount() {
    this.props.fetchHospitalList();
  }

  componentWillUnmount() {
    this.props.resetCreateSuccess();
  }

  render() {
    switch (this.state.step) {
      case 1:
        return <FinanciadorFormStep1 nextStep={this.nextStep} success={this.props.createSuccess}/>
      case 2:
        return <FinanciadorFormStep2
          planInputs={this.state.planInputs}
          hospitalInputs={this.state.hospitalInputs}
          hospitals={this.props.hospitals}
          add={this.add}
          previousStep={this.previousStep}
          submitAll={this.submitAllToStore}
          success={this.props.createSuccess}
        />
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanciadorForm);
