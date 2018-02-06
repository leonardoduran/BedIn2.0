import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
const marginLeft = {marginLeft:"5px"} 

function ViewPatientRequestsPendingTable(props) {
    const setRowColor = (color) => ({backgroundColor : color})
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }    
    const tableBody = props.patientsList.map((patient, i) =>
        <tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id} title= {patient.obs ? patient.obs : null}>
            <td>{patient.healthcareplan.name}</td>
            <td>{patient.dni}</td>
            <td>{patient.age}</td>
            <td>{patient.sex}</td>
            <td>{patient.cie10}</td>
            <td>{patient.complexity}</td>
            <td>{patient.healthcare.name}</td>
            <td>{formattedDate(patient.dateCreated)}</td>
            <td>
                 <button title="Visar" type="button" className="btn btn-primary btn-xs" style={marginLeft}
                     onClick={()=> props.setStateF(patient._id, 'Visto')}>
                  <span className="glyphicon glyphicon-eye-open"></span>
                </button>
            </td>
            <td>
                 <button title="Aceptar" type="button" className="btn btn-success btn-xs" style={marginLeft}
                     onClick={()=> props.setStateF(patient._id, 'Aceptado')}>
                  <span className="glyphicon glyphicon-ok"></span>
                  </button>
            </td>
            <td>
                 <button title="Rechazar" type="button" className="btn btn-danger btn-xs" style={marginLeft}
                     onClick={()=> props.setReasonRejection(patient._id)}>
                  <span className="glyphicon glyphicon-remove-circle"></span>
                </button>
            </td>            
        </tr>)
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
                    <th style={{border:"1px solid grey"}}>Fecha/Hora</th>    
                    <th style={{border:"1px solid grey"}}>
                      <a style={{cursor:"pointer"}} onClick={props.setAllViewed}>Ver Todos</a>
                    </th>
                    <th style={{border:"1px solid grey"}}></th>
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
export default ViewPatientRequestsPendingTable;