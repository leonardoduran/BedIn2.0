import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import * as actionCreators from '../redux/actions/actionCreators';

function mapStateToProps(state) {
	return {
		isRequesting: state.authentication.isRequesting,
    	isLoggedIn: state.authentication.isLoggedIn,
    	userType :  state.authentication.userType,
    	error: state.authentication.errorCheckLogin
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class accessRouting extends React.Component {
	constructor(props) {
		super(props)
	}


	componentWillMount() {
    	if(!this.props.userType) this.props.checkLoginFetch();
    
	}

  componentWillReceiveProps (nextProps) {
		if (!nextProps.isRequesting && !nextProps.userType) hashHistory.push('/login');
  }

	render() {
		if(this.props.isRequesting || !this.props.userType) return <p>Cargando... </p>
		return (
			<div>
			{React.cloneElement(this.props.children, { userType: this.props.userType } )}			
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(accessRouting);