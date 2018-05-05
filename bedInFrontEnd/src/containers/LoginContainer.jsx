import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import PropTypes from 'prop-types';
import * as actionCreators from '../redux/actions/actionCreators';

import Login from '../components/Login.jsx';

function mapStateToProps(state) {
  return {
    isRequesting: state.authentication.isRequesting,
    isLoggedIn: state.authentication.isLoggedIn,
    userType: state.authentication.userType,
    error: state.authentication.errorCredentials
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

class LoginContainer extends React.Component {
  static propTypes = {
    userType: PropTypes.any.isRequired,
    loginFetch: PropTypes.any.isRequired,
    isRequesting: PropTypes.bool.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.userType) hashHistory.push(`/${nextProps.userType}`);
  }

  render() {
    const loading = this.props.isRequesting ? (
      <div id="spinner">
        <i className="fa fa-spinner fa-spin" style={{ fontSize: '24px' }} />
      </div>
    ) : (
      <div />
    );

    return (
      <div>
        <Login fetchLogin={this.props.loginFetch} userType={this.props.userType} />
        {loading}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
