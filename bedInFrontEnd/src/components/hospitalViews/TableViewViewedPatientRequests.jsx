import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
const marginLeft = {marginLeft:"50%"}
const marginLeftBtn = {marginLeft:"5px"}

function ViewPatientRequestsViewedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
	
	const tableBody = props.patientsList.map((patient, i) =>
		patient.isConfirm ? (
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
			<td>{formattedDate(patient.dateCreated)}</td>			
			<div>
			<td></td>
			<td>{patient.isCanceledByFin ? 'CANCELADO' : 'FINALIZADO'}</td>
			<td></td>
			</div>
			</tr>
			) 
		:(
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
			<td>{formattedDate(patient.dateCreated)}</td>

        	{patient.isCanceledByFin ?
			(
			<div>
				<td></td>
				<td>CANCELADO</td>
				<td></td>
				
			</div>
			)
			:
			(
			<div>
				<td>
	                 <button title="Aceptar" type="button" className="btn btn-success btn-xs" style={marginLeftBtn}
	                     onClick={()=> props.setStateV(patient._id, 'Aceptado')}>
	                  <span className="glyphicon glyphicon-ok"></span>
	                  </button>
	            </td>
	            <td>
	                 <button title="Rechazar" type="button" className="btn btn-danger btn-xs" style={marginLeftBtn}
	                     onClick={()=> props.setReasonRejection(patient._id)}>
	                  <span className="glyphicon glyphicon-remove-circle"></span>
	                </button>
	            </td>
	            <td>
	                 <button title="Enviar mensaje" type="button" className="btn btn-info btn-xs" style={marginLeftBtn}
	                     onClick={()=> props.openModal(patient._id)}>
	                  <span className="glyphicon glyphicon-envelope"></span>
	                </button>
            	</td>
            </div>
            )
        	}
		</tr>)
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
							<th style={{border:"1px solid grey"}}>Fecha/Hora</th>
			               	<th style={{border:"1px solid grey"}}></th>
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

export default ViewPatientRequestsViewedTable;

// onClick={()=> props.setStateV(patient._id, 'Rechazado')}>