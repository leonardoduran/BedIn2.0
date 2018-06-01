import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import * as actionCreators from '../../redux/actions/actionCreators';

import GlobalNavbar from '../../components/GlobalNavbar.jsx';

const navBarDataUser = {
	linkArray: [
		{
			route: "/Financiador/createrequest",

			name: "Generar Solicitud"
		},
		{
			route: "/Financiador/viewpending",
			name: "Solicitudes Generadas"
		},
		{
			route: "/Financiador/viewmatched",
			name: "Solicitudes Confirmadas"
		}
	],
	logo : '/public/img/logo_original.jpg',
	userType: 'Financiador',
	color : '#3755bb',
	rolUser : 'user'

}

const navBarDataSupervisor = {
	linkArray: [
		{
			route: "/Financiador/createrequest",

			name: "Generar Solicitud"
		},
		{
			route: "/Financiador/viewpending",
			name: "Solicitudes Generadas"
		},
		{
			route: "/Financiador/viewmatched",
			name: "Solicitudes Confirmadas"
		},
		{
			route: "/Financiador/viewReportes",
			name: "Reportes"
		}			
	],
	logo : '/public/img/logo_original.jpg',
	userType: 'Financiador',
	color : '#3755bb',
	rolUser : 'supervisor'
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

class FinanciadorHome extends React.Component {
  constructor (props) {
		super(props);
		this.logOut = this.logOut.bind(this)
  }

	logOut() {
		this.props.logoutFetch();
	}

	// componentWillMount() {
	// 	hashHistory.push('/Financiador/createrequest');
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

export default connect(mapStateToProps, mapDispatchToProps)(FinanciadorHome);
