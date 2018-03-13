import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
const marginLeft = {marginLeft:"50%"}
const marginLeftBtn = {marginLeft:"5px"}
function ViewPatientRequestsRejectedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
    let getReason = function(hospital){
    	return hospital.reasonReject ? hospital.reasonReject.reason : '';
    }


	const tableBody = props.patientsList.map((patient, i) =>
		<tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id} title= {patient.obs ? patient.obs : null}>
            {patient.planExterno ?
              (<td>{patient.healthcareplan.name} ({patient.planExterno}) </td>)
            :
              (<td>{patient.healthcareplan.name} </td>)
            }
			<td>{patient.dni}</td>
			<td>{patient.age}</td>
			<td>{patient.sex}</td>
			<td>{patient.cie10}</td>
			<td>{patient.complexity}</td>
			<td>{patient.healthcare.name}</td>
			<td>{patient.hospitalsAndState.userHospital.name}</td>
			<td>{getReason(patient.hospitalsAndState)}</td>
			<td>{formattedDate(patient.dateCreated)}</td>
			<td>{patient.isCanceledByFin ? 'CANCELADO' : ''}</td>
		</tr>
		)	
	const setRowColor = (color) => ({backgroundColor : color})
	return (
		<div>
            <div className="container">
                <div class="table-responsive">
                    <table className= "table">
			  			<thead style={{border:"1px solid grey"}}>
			    			<tr style={Object.assign({}, setRowColor('lightgrey'))}>
								<th style={{border:"1px solid grey"}}>Plan</th>
								<th style={{border:"1px solid grey"}}>Paciente</th>
								<th style={{border:"1px solid grey"}}>Edad</th>
								<th style={{border:"1px solid grey"}}>Sexo</th>
								<th style={{border:"1px solid grey"}}>Diagnóstico</th>
								<th style={{border:"1px solid grey"}}>Complejidad de Cama</th>
								<th style={{border:"1px solid grey"}}>Solicitante</th>
								<th style={{border:"1px solid grey"}}>Usuario</th>
								<th style={{border:"1px solid grey"}}>Motivo</th>
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
	)
}

export default ViewPatientRequestsRejectedTable;
