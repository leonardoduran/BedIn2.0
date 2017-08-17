import React from 'react';

import moment from 'moment';

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
		</tr>
	)
	return (
		<div>

			<div className="container">
				<div className="row">
					<div className="col-xs-2 col-sm-1 col-lg-1"></div>
					<div className="col-xs-2 col-sm-10 col-lg-10">
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

export default TableDataUserFinanciador;
