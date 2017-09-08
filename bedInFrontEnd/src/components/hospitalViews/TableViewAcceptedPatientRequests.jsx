import React from 'react';
import moment from 'moment';

import store from '../../redux/store';

const tableStyle = {border:"1px solid grey"};
const marginLeft = {marginLeft:"50%"}

function ViewPatientRequestsAcceptedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
	const checkMatch = (idHospital) => 
		(idHospital == store.getState().authentication.institucionCode) ? 
			<p>
				<span style = {marginLeft} className="glyphicon glyphicon-ok"></span>
			</p>:
		    <p>
				<span style = {marginLeft} className="glyphicon glyphicon-remove"></span>
		    </p>
	const setRowColor = (color) => ({backgroundColor : color})
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
			<td style={tableStyle}>
				{checkMatch(patient.sentTo.hospital)}
			</td>
		</tr>
		)

	return (
		<div>

			<div className="container">
				<div className="row">

					<div className="col-xs-1"></div>
						<div className="col-xs-10">

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
					      <th style={{border:"1px solid grey"}}>Confirmado</th>
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

export default ViewPatientRequestsAcceptedTable;
