import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actionCreators from '../../redux/actions/bdinActions/actions';

function mapStateToProps(state) {
    return {
        isChangingPass : state.patients.isChangingPass
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}


function TableDataUserFinanciador(props) {
	let formattedDate =  function(date) {
		// console.log('DATE', moment(date).format('DD/MM/YYYY HH:mm:ss'))
		return moment(date).format('DD/MM/YYYY || HH:mm:ss');
	}
	const users = props.users.map(user =>
		<tr key = {user._id}>
			<td>{user.name}</td>
			<td>{user.username}</td>
			<td>{formattedDate(user.createdAt)}</td>
			<td>{user.workplace}</td>
			<td>{user.rol}</td>
			<button onClick={()=> props.changePass(user._id)}>Reset Password</button>
		</tr>
	)
	return (
		<div>

			<div className="container">
				<div className="row">
					<div className="col-xs-1 col-sm-1 col-lg-1"></div>
					<div className="col-xs-10 col-sm-10  col-lg-10">
						<table className = "table" >
							<thead>
								<tr>
									<th>NOMBRE</th>
									<th>USERNAME</th>
									<th>FECHA/HORA DE CREACIÓN</th>
									<th>EMPLEADOR</th>
									<th>ROL</th>
								</tr>
							</thead>
							<tbody>
							{users}
							</tbody>
						</table>
					</div>
					<div className="col-xs-2 col-sm-10 col-lg-10"></div>
				</div>
			</div>

		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDataUserFinanciador);
