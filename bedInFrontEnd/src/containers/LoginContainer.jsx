import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actionCreators from '../redux/actions/actionCreators';

import Login from '../components/Login.jsx';

function mapStateToProps(state) {
  return {
    isRequesting: state.authentication.isRequesting,
    isLoggedIn: state.authentication.isLoggedIn,
    userType :  state.authentication.userType,
    error: state.authentication.errorCredentials
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.userType) 
      hashHistory.push(`/${nextProps.userType}`);
  }

  render() {
    const loading = (this.props.isRequesting) 
    ? <div id="spinner">
    <i className="fa fa-spinner fa-spin" style={{fontSize:"24px"}}></i>




    </div>   
    : <div></div>
    const error = (this.props.error) ?
    <div>{this.props.error}</div>
    : <div></div>
    
    return (
      <div>
        <Login fetchLogin = {this.props.loginFetch}
          userType = {this.props.userType}
        />
      {loading}
      {error}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
