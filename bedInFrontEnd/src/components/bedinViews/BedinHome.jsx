import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actionCreators from '../../redux/actions/actionCreators';

import GlobalNavbar from '../GlobalNavbar.jsx';

const navBarData = {
	linkArray: [
		{
			route: "/Bedin/financiador",
			name: "OBRAS SOCIALES"
		},
		{
			route: "/Bedin/hospital",
			name: "HOSPITAL"
		},
		{
			route: "/Bedin/administrador",
			name: "ADMINISTRADOR"
		}
	],
	logo : '/public/img/logo_original.jpg',
	userType: 'Bedin'
}

function mapStateToProps(state) {
	return {
		isRequesting: state.authentication.isRequesting,
		isLoggedIn: state.authentication.isLoggedIn,
		username: state.authentication.userName,
		userId: state.authentication.userId
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class Home extends React.Component {
  constructor (props) {
		super(props);
		this.logOut = this.logOut.bind(this)
  }

	logOut() {
		this.props.logoutFetch();
	}

	componentWillMount() {
		hashHistory.push('/Bedin/financiador');
	}

	//componentWillReceiveProps(props) {
	//	if(!props.isLoggedIn) hashHistory.push('/');
	//}

  render() {
    return (
      <div>
        <GlobalNavbar data={navBarData} 
	        logOut={this.logOut}
					username={this.props.username}
					userId={this.props.userId}
        />
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);