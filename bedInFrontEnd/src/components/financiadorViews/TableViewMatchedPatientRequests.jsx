import React from 'react';
import moment from 'moment';
const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
function ViewPatientRequestsMatchedTable(props) {
    let formattedDate =  function(date) {
        // return moment(date).format('DD/MM/YYYY || HH:mm:ss');
        return (moment(date).isSame(moment(), 'day')?'HOY  ':'AYER ') + moment(date).format('HH:mm:ss');
    }
    
    const buildMessages = (listMsgs = [],idHosp) => {
      let hayMsg;
      hayMsg=false;
      for(let i=0;i<listMsgs.length;i++){       
        if(listMsgs[i].hospitalId._id == idHosp){
          hayMsg=true;
          break;
        }
      }
      return hayMsg
    }

    const setRowColor = (color) => ({backgroundColor : color})  
    const marginLeft = {marginLeft:"5px"};
    const tableBody = props.patients.map((patient, i) =>
        <tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id} title= {patient.obs ? patient.obs : null}>
            <td>{patient.dni}</td>
            <td>{patient.cie10}</td>
            <td>{patient.complexity}</td>
            <td>{patient.hospitalsAndState[0].hospital.name}</td>
            <td title= {formattedDate(patient.dateCreated)}>{patient.userCreator ? patient.userCreator.name : ''}</td>
            <td title= {formattedDate(patient.updatedDate)}>{patient.hospitalsAndState[0].userHospital.name}</td>
            <td title= {formattedDate(patient.matchedDate)}>{patient.hospitalsAndState[0].userFinanciador.name}</td>
            {(patient.hospitalsAndState[0].matchedDate && buildMessages (patient.messages,patient.hospitalsAndState[0].hospital._id)) ? 
              (<td>
                  <button title="Ver Mensajes " type="button" className="btn btn-info btn-xs" style={marginLeft}
                    onClick={()=> props.verMensajes(patient.messages)}>
                  <span className="glyphicon glyphicon-envelope"></span>
                  </button>
              </td>)
              :
              (<td> </td>)}

        </tr>)
    return (
        <div>

        <div className="container container_a">
          <div className="row">
            <div className="col-xs-2 col-sm-4 col-lg-1"></div>
            <div className="col-xs-8 col-sm-6 col-lg-10 ">

            <table style={{border:"1px solid grey"}} className= "table table-responsive">
              <thead style={{border:"1px solid grey"}}>
                 <tr style={Object.assign({}, setRowColor('lightgrey'))}>
                  <th style={{border:"1px solid grey"}}>Paciente</th>
                  <th style={{border:"1px solid grey"}}>Diagnóstico</th>
                  <th style={{border:"1px solid grey"}}>Complejidad</th>
                  <th style={{border:"1px solid grey"}}>Institución</th>
                  <th style={{border:"1px solid grey"}}>Generó</th>
                  <th style={{border:"1px solid grey"}}>Aceptó</th>
                  <th style={{border:"1px solid grey"}}>Confirmó</th>
                  <th style={{border:"1px solid grey"}}>Mensajes</th>
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


            // {patient.messages.length > 0 ? 
            //   (<td>
            //       <button title="Ver Mensajes " type="button" className="btn btn-info btn-xs" style={marginLeft}
            //         onClick={()=> props.verMensajes(patient.messages)}>
            //       <span className="glyphicon glyphicon-envelope"></span>
            //       </button>
            //   </td>)
            //   :
            //   (<td> </td>)}