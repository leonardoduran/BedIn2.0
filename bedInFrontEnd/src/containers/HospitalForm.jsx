import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/formActions';

import HospitalForm1 from '../components/bedinViews/HospitalForm1.jsx';


function mapStateToProps(state) {
  return {
    isRequesting: state.formReducers.isRequesting,
    createSuccess: state.formReducers.createSuccess,
    requestFail: state.formReducers.requestFail,
    error: state.formReducers.error,
    name: state.formReducers.name,
    address: state.formReducers.address,
    phone:  state.formReducers.phone,
    email: state.formReducers.email
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}



class HospitalForm extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this)
  }

  componentWillUnmount() {
    this.props.resetCreateSuccess();
  }

  create(e) {
    e.preventDefault();
    this.props.createEntidadHospital({
      name:  document.getElementById("inputNombre").value,
      address: document.getElementById("inputDireccion").value,
      phone: document.getElementById("inputTelefono").value,
      email: document.getElementById("inputEmail").value
    })
  }

  render() {
    return (
      <div>
        <HospitalForm1 createHospital={this.create} success={this.props.createSuccess} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalForm);
