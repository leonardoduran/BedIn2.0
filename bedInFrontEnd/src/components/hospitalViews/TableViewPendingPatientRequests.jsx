import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const marginLeft = {marginLeft:"5px"}
function ViewPatientRequestsPendingTable(props) {
    const setRowColor = (color) => ({backgroundColor : color})
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
            <td style={tableStyle}>{formattedDate(patient.dateCreated)}</td>
            <td style={tableStyle}>
                 <button type="button" className="btn btn-primary btn-xs" style={marginLeft}
                     onClick={()=> props.setState(patient._id, 'Visto')}>
            <span className="glyphicon glyphicon-eye-open"></span>
        </button>
            </td>
            <td style={tableStyle}>
                 <button type="button" className="btn btn-success btn-xs" style={marginLeft}
                     onClick={()=> props.setState(patient._id, 'Aceptado')}>
            <span className="glyphicon glyphicon-ok"></span>
        </button>
            </td>
        </tr>)
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
                    <th style={{border:"1px solid grey"}}>Fecha/Hora</th>    
                  <th style={{border:"1px solid grey"}}>
                            <a style={{cursor:"pointer"}} onClick={props.setAllViewed}>Ver Todos</a>
                  </th>
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
        </div>
    )
}
export default ViewPatientRequestsPendingTable;