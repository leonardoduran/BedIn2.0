import React from 'react';
import moment from 'moment';
const tableStyle = {border:"1px solid grey"};
function ViewPatientRequestsMatchedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
    const setRowColor = (color) => ({backgroundColor : color})  
    const tableBody = props.patients.map((patient, i) =>
        <tr style={tableStyle} key={patient._id} title= {patient.obs ? patient.obs : null}>
            <td style={tableStyle}>{patient.dni}</td>
            <td style={tableStyle}>{patient.cie10}</td>
            <td style={tableStyle}>{patient.complexity}</td>
            <td style={tableStyle}>{patient.hospitalsAndState[0].hospital.name}</td>
            <td style={tableStyle} title= {formattedDate(patient.dateCreated)}>{patient.userCreator ? patient.userCreator.name : ''}</td>
            <td style={tableStyle} title= {formattedDate(patient.updatedDate)}>{patient.hospitalsAndState[0].userHospital.name}</td>
            <td style={tableStyle} title= {formattedDate(patient.matchedDate)}>{patient.hospitalsAndState[0].userFinanciador.name}</td>
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
                  <th style={{border:"1px solid grey"}}>Diagnóstico</th>
                  <th style={{border:"1px solid grey"}}>Complejidad</th>
                  <th style={{border:"1px solid grey"}}>Institución</th>
                  <th style={{border:"1px solid grey"}}>Generó</th>
                  <th style={{border:"1px solid grey"}}>Aceptó</th>
                  <th style={{border:"1px solid grey"}}>Confirmó</th>
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