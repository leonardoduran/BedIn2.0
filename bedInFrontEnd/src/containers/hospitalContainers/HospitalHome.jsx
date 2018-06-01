import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actionCreators from '../../redux/actions/actionCreators';

import GlobalNavbar from '../../components/GlobalNavbar.jsx';

const navBarDataSupervisor = {
	linkArray: [
		{
			route: "/Hospital/viewpending",
			name: "Pendientes"
		},
		{
			route: "/Hospital/viewaccepted",
			name: "Aceptados"

		},
		{
			route: "/Hospital/viewrejected",
			name: "Rechazados"

		},
		{
			route: "/Hospital/viewviewed",
			name: "Vistos"

		}
		,
		{
			route: "/Hospital/viewReportes",
			name: "Reportes"
		}		
	],
	logo : '/public/img/logo_original.jpg',
	color : '#34c0de',
	userType: 'Hospital',
	rolUser : 'supervisor'

}

const navBarDataUser = {
	linkArray: [
		{
			route: "/Hospital/viewpending",
			name: "Pendientes"
		},
		{
			route: "/Hospital/viewaccepted",
			name: "Aceptados"

		},
		{
			route: "/Hospital/viewrejected",
			name: "Rechazados"

		},
		{
			route: "/Hospital/viewviewed",
			name: "Vistos"

		}	
	],
	logo : '/public/img/logo_original.jpg',
	color : '#34c0de',
	userType: 'Hospital',
	rolUser : 'user'
}

function mapStateToProps(state) {
	return {
		isRequesting: state.authentication.isRequesting,
		isLoggedIn: state.authentication.isLoggedIn,
		username: state.authentication.userName,
		userId: state.authentication.userId,
		rol : state.authentication.rolUser
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class HospitalHome extends React.Component {
  constructor (props) {
		super(props);
		this.logOut = this.logOut.bind(this)
  }

	logOut() {
		this.props.logoutFetch();
	}

	// componentWillMount() {
	// 	hashHistory.push('/Hospital/viewpending');
	// }

	//componentWillReceiveProps(props) {
	//	if(!props.isLoggedIn) hashHistory.push('/');
	//}

  render() {
    return (
      <div>
        <GlobalNavbar data={this.props.rol.toLowerCase()=='supervisor' ? navBarDataSupervisor : navBarDataUser}
	        logOut={this.logOut}
			username={this.props.username}
			userId={this.props.userId}
        />
        {this.props.children}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HospitalHome);

