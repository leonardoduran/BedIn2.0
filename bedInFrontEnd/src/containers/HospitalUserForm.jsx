import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../redux/actions/formActions';

import HospitalUserForm1 from '../components/bedinViews/HospitalUserForm1.jsx';


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
    hospitalCode: state.formReducers.osCode,
    hospitals: state.formReducers.hospitals
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}



class HospitalUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.create = this.create.bind(this)
  }

  componentDidMount() {
    this.props.fetchHospitalList();
  }

  componentWillUnmount() {
    this.props.resetCreateSuccess();
  }

  create(e) {
    let checkedHospital = this.props.hospitals.filter(hospital => hospital.name === e.target.hospitals.value)
    e.preventDefault();
    this.props.createUser({
      name: e.target.nombre.value,
      //address: e.target.direccion.value,
      //phone: e.target.telefono.value,
      //email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
      type: "Hospital",
      hospitalCode: checkedHospital[0]._id
    })
  }

  render() {
    return (
      <div>
        <HospitalUserForm1 hospitals={this.props.hospitals} createUser={this.create} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalUserForm);
