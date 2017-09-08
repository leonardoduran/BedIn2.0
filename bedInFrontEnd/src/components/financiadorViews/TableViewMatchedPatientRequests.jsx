import React from 'react';
import moment from 'moment';
const tableStyle = {border:"1px solid grey"};
function ViewPatientRequestsMatchedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return  (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
    const setRowColor = (color) => ({backgroundColor : color})  
    const tableBody = props.patients.map((patient, i) =>
        <tr style={tableStyle} key={patient._id}>
            <td style={tableStyle}>{patient.dni}</td>
            <td style={tableStyle}>{patient.age}</td>
            <td style={tableStyle}>{patient.sex}</td>
            <td style={tableStyle}>{patient.cie10}</td>
            <td style={tableStyle}>{patient.complexity}</td>
            <td style={tableStyle}>{patient.sentTo.hospital.name}</td>
            <td style={tableStyle}>{patient.healthcareplan.name}</td>
            <td style={tableStyle}>{patient.sentTo.userFinanciador.name}</td>
            <td style={tableStyle}>{formattedDate(patient.dateCreated)}</td>
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
                  <th style={{border:"1px solid grey"}}>Complejidad</th>
                  <th style={{border:"1px solid grey"}}>Institución</th>
                  <th style={{border:"1px solid grey"}}>Plan</th>
                  <th style={{border:"1px solid grey"}}>Usuario</th>
                  <th style={{border:"1px solid grey"}}>Fecha/Hora Creado</th>
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
export default ViewPatientRequestsMatchedTable;