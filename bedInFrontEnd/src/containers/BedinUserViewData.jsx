import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/viewUser';

import TableDataUserBedin from '../components/bedinViews/TableDataUserBedin.jsx';
import Loading from '../components/Loading.jsx';

function mapStateToProps(state) {
	return {
		usersBedin : state.viewUser.users,
		isRequesting: state.viewUser.isRequesting
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actionCreators, dispatch);
}

class BedinUserViewData extends React.Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.fetchGetUsersByType('Bedin');
	}

	render() {
		const dataUserBedin = (this.props.usersBedin === null)
		? <Loading />
		: <TableDataUserBedin users = {this.props.usersBedin}/>
		return (
			<div>
				{dataUserBedin}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BedinUserViewData);
