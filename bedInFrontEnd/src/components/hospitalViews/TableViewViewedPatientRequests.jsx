import React from 'react';

const tableStyle = {border:"1px solid black"};
const marginLeft = {marginLeft:"50%"}

function ViewPatientRequestsViewedTable(props) {

	const tableBody = props.patientsList.map((patient, i) =>
		<tr style={tableStyle} key={patient.dni}>
			<td style={tableStyle}>{patient.dateCreated}</td>
			<td style={tableStyle}>{patient.dni}</td>
			<td style={tableStyle}>{patient.age}</td>
			<td style={tableStyle}>{patient.sex}</td>
			<td style={tableStyle}>{patient.cie10}</td>
			<td style={tableStyle}>{patient.complexity}</td>
			<td style={tableStyle}>{patient.healthcare.name}</td>
			<td style={tableStyle}>{patient.healthcareplan.name}</td>
			<td style={tableStyle}>{patient.hospitalsAndState.userHospital.username}</td>
		</tr>
		)

	return (
		<div>
			<table style={{border:"1px solid black"}} className= "table">
			  <thead style={{border:"1px solid black"}}>
			    <tr>
			    	<th style={{border:"1px solid black"}}>Fecha/Hora</th>
						<th style={{border:"1px solid black"}}>DNI</th>
						<th style={{border:"1px solid black"}}>Edad</th>
						<th style={{border:"1px solid black"}}>Sexo</th>
						<th style={{border:"1px solid black"}}>CIE 10</th>
						<th style={{border:"1px solid black"}}>Complejidad de Cama</th>
						<th style={{border:"1px solid black"}}>Obra Social</th>
						<th style={{border:"1px solid black"}}>Plan</th>
						<th style={{border:"1px solid black"}}>Usuario</th>
			    </tr>
			  </thead>
			  <tbody>
			  {tableBody}
			  </tbody>
			</table>
		</div>
	)
}

export default ViewPatientRequestsViewedTable;
