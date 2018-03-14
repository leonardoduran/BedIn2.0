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
	const buildAnswer = (listRequest = []) => {
		return listRequest.map(request =>
			props.hospitalId === request.hospital._id && request.userHospital ?
				(<p>{request.state} ({request.userHospital.name})</p>)
				: null
		)
	}
	const buildDateAnswer = (listRequest = []) => {
		return listRequest.map(request =>
			props.hospitalId === request.hospital._id && request.updatedDate ?
				(<p>{formattedDate(request.updatedDate)}</p>)
				: null
		)
	}

	const buildReasonReject = (listRequest = []) => {
		return listRequest.map(request =>
			props.hospitalId === request.hospital._id && request.reasonReject ?
				(<p>{request.reasonReject.reason}</p>)
				: null
		)
	}

	const buildConfirm = (listRequest = []) => {
		return listRequest.map(request =>
			request.matchedDate && props.hospitalId === request.hospital._id ?
				  <p>SI</p>
				: null
		)
	}
	const buildDateConfirm = (listRequest = []) => {
		return listRequest.map(request =>
			props.hospitalId === request.hospital._id && request.matchedDate ?
				(<p>{formattedDate(request.matchedDate)}</p>)
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
            {patient.planExterno ?
              (<td style={tableStyle}>{patient.healthcareplan.name} ({patient.planExterno}) </td>)
            :
              (<td style={tableStyle}>{patient.healthcareplan.name} </td>)
            }
			<td>{formattedDate(patient.dateCreated)}</td>
			<td>
				{buildAnswer(patient.hospitalsAndState)}
			</td>
			<td>
				{buildDateAnswer(patient.hospitalsAndState)}
			</td>

			<td>
				{buildReasonReject(patient.hospitalsAndState)}
			</td>

			<td>
				{buildConfirm(patient.hospitalsAndState)}
			</td>
			<td>
				{buildDateConfirm(patient.hospitalsAndState)}
			</td>
			<td>{patient.obs}</td>
		    {patient.isCanceledByFin ?
              (<td style={tableStyle}>SI ({patient.reasonRejectFin.reason})</td>):
              (<td style={tableStyle}>NO</td>)
          	}
        </tr>
		)	
	const setRowColor = (color) => ({backgroundColor : color})
	return (
		<div>
        <div className="container container_a">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-lg-12" id="table_wrapper">
			<table style={{border:"1px solid grey"}} className= "table">
			  <thead style={{border:"1px solid grey"}}>
			    <tr style={Object.assign({}, setRowColor('lightgrey'))}>
					<th style={{border:"1px solid grey"}}>Solicitante</th>
					<th style={{border:"1px solid grey"}}>Paciente</th>
					<th style={{border:"1px solid grey"}}>Edad</th>
					<th style={{border:"1px solid grey"}}>Sexo</th>
					<th style={{border:"1px solid grey"}}>Diagnóstico</th>
					<th style={{border:"1px solid grey"}}>Complejidad</th>
					<th style={{border:"1px solid grey"}}>Plan</th>
					<th style={{border:"1px solid grey"}}>Fecha creación</th>
					<th style={{border:"1px solid grey"}}>Respuesta</th>
					<th style={{border:"1px solid grey"}}>Fecha respuesta</th>
					<th style={{border:"1px solid grey"}}>Motivo rechazo</th>
					<th style={{border:"1px solid grey"}}>Confirmado</th>
					<th style={{border:"1px solid grey"}}>Fecha confirmación</th>
					<th style={{border:"1px solid grey"}}>Comentario</th>
					<th style={{border:"1px solid grey"}}>Cancelado</th>
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

// <td>{patient.reasonReject.reason}</td>

            // <div className="col-xs-2 col-sm-4 col-lg-1"></div>
            // <div className="col-xs-8 col-sm-6 col-lg-10 " id="table_wrapper">