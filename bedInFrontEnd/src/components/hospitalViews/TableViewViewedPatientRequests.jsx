import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const marginLeft = {marginLeft:"50%"}

function ViewPatientRequestsViewedTable(props) {
    let formattedDate =  function(date) {
        return moment(date).format('DD/MM/YYYY || HH:mm:ss');
    }
	const tableBody = props.patientsList.map((patient, i) =>
		<tr style={tableStyle} key={patient._id}>
			<td style={tableStyle}>{patient.dni}</td>
			<td style={tableStyle}>{patient.age}</td>
			<td style={tableStyle}>{patient.sex}</td>
			<td style={tableStyle}>{patient.cie10}</td>
			<td style={tableStyle}>{patient.complexity}</td>
			<td style={tableStyle}>{patient.healthcare.name}</td>
			<td style={tableStyle}>{patient.hospitalsAndState.userHospital.name}</td>
			<td style={tableStyle}>{formattedDate(patient.dateCreated)}</td>
		</tr>
		)	
	const setRowColor = (color) => ({backgroundColor : color})
	return (
		<div>
        <div className="container container_a">
          <div className="row">
            <div className="col-xs-2 col-sm-4 col-lg-1"></div>
            <div className="col-xs-8 col-sm-6 col-lg-10 ">


			<table style={{border:"1px solid grey"}} className= "table">
			  <thead style={{border:"1px solid grey"}}>
			    <tr style={Object.assign({}, setRowColor('lightgrey'))}>
					<th style={{border:"1px solid grey"}}>Paciente</th>
					<th style={{border:"1px solid grey"}}>Edad</th>
					<th style={{border:"1px solid grey"}}>Sexo</th>
					<th style={{border:"1px solid grey"}}>Diagnóstico</th>
					<th style={{border:"1px solid grey"}}>Complejidad de Cama</th>
					<th style={{border:"1px solid grey"}}>Solicitante</th>
					<th style={{border:"1px solid grey"}}>Usuario</th>
					<th style={{border:"1px solid grey"}}>Fecha/Hora</th>
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
