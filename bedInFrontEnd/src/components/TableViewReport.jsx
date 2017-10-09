import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
const marginLeft = {marginLeft:"50%"}
const marginLeftBtn = {marginLeft:"5px"}

function ViewTableReport(props) {
    let formattedDate =  function(date) {
        return moment(date).format('DD/MM/YYYY || HH:mm:ss');
    }
	const buildDetailTable = (listRequest = [], state) => {
		return listRequest.map(request =>
			(state==null || request.state == state) ?
				<p>- {request.hospital.name}</p>
				: null
		)
	}
	const buildConfirm = (listRequest = []) => {
		return listRequest.map(request =>
			request.matchedDate ?
				<p>{request.hospital.name} ({request.userFinanciador.name})</p>
				: null
		)
	}
	const tableBody = props.patientsList.map((patient, i) =>
		<tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id}>
			<td>{patient.healthcare.name}</td>
			<td>{patient.dni}</td>
			<td>{patient.age}</td>
			<td>{patient.sex}</td>
			<td>{patient.cie10}</td>
			<td>{patient.complexity}</td>
			<td>{formattedDate(patient.dateCreated)} por {patient.userCreator.name}</td>
			<td>{patient.healthcareplan.name}</td>
			<td style={tableStyle}>
				{buildDetailTable(patient.hospitalsAndState)}
			</td>
			<td style={tableStyle}>
				{buildDetailTable(patient.hospitalsAndState,"Aceptado")}
			</td>
			<td style={tableStyle}>
				{buildDetailTable(patient.hospitalsAndState,"Rechazado")}
			</td>
			<td style={tableStyle}>
				{buildDetailTable(patient.hospitalsAndState,"Visto")}
			</td>
			<td>
				{buildConfirm(patient.hospitalsAndState)}
			</td>			
			<td>{patient.obs}</td>
        </tr>
		)	
	const setRowColor = (color) => ({backgroundColor : color})
	return (
		<div>
        <div className="container container_a">
          <div className="row">
            <div className="col-xs-2 col-sm-4 col-lg-1"></div>
            <div className="col-xs-8 col-sm-6 col-lg-10 " id="table_wrapper">

			<table style={{border:"1px solid grey"}} className= "table">
			  <thead style={{border:"1px solid grey"}}>
			    <tr style={Object.assign({}, setRowColor('lightgrey'))}>
					<th style={{border:"1px solid grey"}}>Solicitante</th>
					<th style={{border:"1px solid grey"}}>Paciente</th>
					<th style={{border:"1px solid grey"}}>Edad</th>
					<th style={{border:"1px solid grey"}}>Sexo</th>
					<th style={{border:"1px solid grey"}}>Diagnóstico</th>
					<th style={{border:"1px solid grey"}}>Complejidad</th>
					<th style={{border:"1px solid grey"}}>Creado</th>
					<th style={{border:"1px solid grey"}}>Plan</th>
					<th style={{border:"1px solid grey"}}>Enviado a</th>
					<th style={{border:"1px solid grey"}}>Aceptado por</th>
					<th style={{border:"1px solid grey"}}>Rechazado por</th>
					<th style={{border:"1px solid grey"}}>Visto por</th>
					<th style={{border:"1px solid grey"}}>Confirmado a/por</th>
					<th style={{border:"1px solid grey"}}>Comentario</th>
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

export default ViewTableReport;