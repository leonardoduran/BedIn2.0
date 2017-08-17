import React from 'react';

import moment from 'moment';

const tableStyle = {border:"1px solid black"};

function ViewPatientRequestsMatchedTable(props) {

	let formattedDate =  function(date) {
		return moment(date).format('DD/MM/YYYY || HH:mm:ss');
	}

	const tableBody = props.patients.map((patient, i) =>
		<tr style={tableStyle} key={patient.dni}>
			<td style={tableStyle}>{formattedDate(pending.dateCreated)}</td>
			<td style={tableStyle}>{patient.dni}</td>
			<td style={tableStyle}>{patient.healthcareplan.name}</td>
			<td style={tableStyle}>{patient.cie10}</td>
			<td style={tableStyle}>{patient.complexity}</td>
			<td style={tableStyle}>{patient.sentTo.hospital.name}</td>
			<td style={tableStyle}>{patient.sentTo.userFinanciador.username}</td>
		</tr>)

	return (
		<div>

			<div className="container">
				<div className="row">

					<div className="col-xs-1"></div>
					<div className="col-xs-10">


						<table style={{border:"1px solid black"}} className= "table">
						  <thead style={{border:"1px solid black"}}>
						    <tr>
						    	<th style={{border:"1px solid black"}}>Fecha/Hora Creado</th>
						      <th style={{border:"1px solid black"}}>Paciente</th>
						      <th style={{border:"1px solid black"}}>Plan</th>
						      <th style={{border:"1px solid black"}}>CIE</th>
						      <th style={{border:"1px solid black"}}>Complejidad</th>
						      <th style={{border:"1px solid black"}}>Hospital</th>
						      <th style={{border:"1px solid black"}}>Usuario</th>
						    </tr>
						  </thead>
						  <tbody>
						  {tableBody}
						  </tbody>
						</table>
					</div>
				</div>
			</div>


		</div>
	)
}

export default ViewPatientRequestsMatchedTable;
