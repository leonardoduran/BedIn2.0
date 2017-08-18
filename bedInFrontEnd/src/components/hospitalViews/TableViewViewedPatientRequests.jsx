import React from 'react';

const tableStyle = {border:"1px solid black"};
const marginLeft = {marginLeft:"50%"}

function ViewPatientRequestsViewedTable(props) {

	const tableBody = props.patientsList.map((patient, i) =>
		<tr style={tableStyle} key={patient._id}>
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
        <div className="container container_a">
          <div className="row">
            <div className="col-xs-2 col-sm-4 col-lg-1"></div>
            <div className="col-xs-8 col-sm-6 col-lg-10 ">


			<table style={{border:"1px solid black"}} className= "table">
			  <thead style={{border:"1px solid black"}}>
			    <tr>
			    	<th style={{border:"1px solid black"}}>Fecha/Hora</th>
						<th style={{border:"1px solid black"}}>Paciente</th>
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
		</div>
	</div>
		</div>
	)
}

export default ViewPatientRequestsViewedTable;
