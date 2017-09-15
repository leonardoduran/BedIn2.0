import React from 'react';
import moment from 'moment';

import store from '../../redux/store';

const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
const marginLeft = {marginLeft:"50%"}

function ViewPatientRequestsAcceptedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
	const checkMatch = (idHospital,matchedDate, isConfirm) => 
		(idHospital == store.getState().authentication.institucionCode && matchedDate) ? 
			<p>
				<span style = {marginLeft} className="glyphicon glyphicon-ok"></span>
			</p>:
		    (isConfirm) ? 
		    <p>
				<span style = {marginLeft} className="glyphicon glyphicon-remove"></span>
		    </p>:
		    <p>
		    </p>
	const setRowColor = (color) => ({backgroundColor : color})
	const tableBody = props.patientsList.map((patient, i) =>

		<tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id} title= {patient.obs ? patient.obs : null}>
			<td>{patient.dni}</td>
			<td>{patient.age}</td>
			<td>{patient.sex}</td>
			<td>{patient.cie10}</td>
			<td>{patient.complexity}</td>
			<td>{patient.healthcare.name}</td>
			<td>{patient.hospitalsAndState ? patient.hospitalsAndState.userHospital.name : ''}</td>
			<td>{formattedDate(patient.dateCreated)}</td>
			<td>
				{checkMatch(patient.hospitalsAndState ? patient.hospitalsAndState.hospital : 0, patient.hospitalsAndState ? patient.hospitalsAndState.matchedDate : 0, patient.isConfirm)}
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


// {checkMatch(patient.hospitalsAndState[0] ? patient.hospitalsAndState[0].hospital : 0)}
