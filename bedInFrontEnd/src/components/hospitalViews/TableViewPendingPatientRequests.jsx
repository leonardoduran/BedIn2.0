import React from 'react';

const tableStyle = {border:"1px solid black"};
const marginLeft = {marginLeft:"5px"}

function ViewPatientRequestsPendingTable(props) {

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
			<td style={tableStyle}>
				 <button type="button" className="btn btn-success btn-xs" style={marginLeft}
				 	 onClick={()=> props.setState(patient._id, 'Aceptado')}>
        	<span className="glyphicon glyphicon-ok"></span>
      	</button>
			</td>
			<td style={tableStyle}>
				 <button type="button" className="btn btn-primary btn-xs" style={marginLeft}
				 	 onClick={()=> props.setState(patient._id, 'Visto')}>
        	<span className="glyphicon glyphicon-eye-open"></span>
      	</button>
			</td>
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
							    	<th style={{border:"1px solid black"}}>Fecha/Hora</th>
										<th style={{border:"1px solid black"}}>DNI</th>
										<th style={{border:"1px solid black"}}>Edad</th>
										<th style={{border:"1px solid black"}}>Sexo</th>
										<th style={{border:"1px solid black"}}>CIE 10</th>
										<th style={{border:"1px solid black"}}>Complejidad de Cama</th>
										<th style={{border:"1px solid black"}}>Solicitante</th>
										<th style={{border:"1px solid black"}}>Plan</th>
							      <th style={{border:"1px solid black"}}></th>
							      <th style={{border:"1px solid black"}}></th>
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

export default ViewPatientRequestsPendingTable;
