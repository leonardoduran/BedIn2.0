import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/formActions';

import FinanciadorUserForm1 from '../components/bedinViews/FinanciadorUserForm1.jsx';


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
    username: state.formReducers.username,
    password: state.formReducers.password,
    type: state.formReducers.type,
    osCode: state.formReducers.osCode,
    financiadors: state.formReducers.financiadors
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}



class FinanciadorUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this)
  }

  componentWillMount() {
    this.props.fetchFinanciadorList();
  }

  componentWillUnmount() {
    this.props.resetCreateSuccess();
  }

  create(e) {
    let checkedFinanciador = this.props.financiadors.filter(financiador => financiador.name === e.target.financiadors.value)
    e.preventDefault();
    this.props.createUser({
      name: e.target.nombre.value,
      //address: e.target.direccion.value,
      //phone: e.target.telefono.value,
      //email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      type: "Financiador",
      osCode: checkedFinanciador[0]._id
    })
  }

  render() {
    return (
      <div>
        <FinanciadorUserForm1 financiadors={this.props.financiadors} createUser={this.create} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinanciadorUserForm);
