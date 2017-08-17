import React from 'react';

import moment from 'moment';

function TableDataUserBedin(props) {
	let formattedDate =  function(date) {
		return moment(date).format('DD/MM/YYYY || HH:mm:ss');
	}
	const users = props.users.map(user =>
		<tr key = {user._id}>
			<td>{user.name}</td>
			<td>{user.username}</td>
			<td>{formattedDate(user.createdAt)}</td>
			<td>{user.workplace || 'Bedin'}</td>
			<td>{user.rol || 'Admin'}</td>
		</tr>
	)
	return (

		<div>

			<div className="container">
				<div className="row">
					<div className="col-xs-2 col-sm-2 col-lg-2"></div>
					<div className="col-xs-2 col-sm-8 col-lg-8">
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
					<div className="col-xs-2 col-sm-2 col-lg-2"></div>
				</div>
			</div>

		</div>
	)
}

export default TableDataUserBedin;
