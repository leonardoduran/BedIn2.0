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
    const setTachado  = ()      => ({"text-decoration" : "line-through"})
    const marginLeft = {marginLeft:"5px"};
// style={Object.assign({}, tableStyle, colorStyle)}

// <tr style={Object.assign({}, i%2==0 ? tableStyle : tableStyle1)} key={patient._id} title= {patient.obs ? patient.obs : null}>
// <tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id} title= {patient.obs ? patient.obs : null}>
    const tableBody = props.patients.map((patient, i) => {
      let typeStyle = (patient.isCanceledByFin) ? setTachado() : null;
        return(
        <tr style={Object.assign({}, i%2==0 ? tableStyle : tableStyle1,typeStyle)} key={patient._id} title= {patient.obs ? patient.obs : null}>
            <td>{formattedDate(patient.dateCreated)}</td>
            <td>{patient.userCreator.name}</td>
            <td>{patient.healthcare.name}</td>
            {patient.planExterno ?
              (<td style={tableStyle}>{patient.healthcareplan.name} ({patient.planExterno}) </td>)
            :
              (<td style={tableStyle}>{patient.healthcareplan.name} </td>)
            }
            <td>{patient.dni}</td>
            <td>{patient.age}</td>
            <td>{patient.cie10}</td>

            <td>{patient.hospitalsAndState[0].hospital.name}</td>
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
              (<td></td>)
            }

              {patient.isCanceledByFin ? 
                (<td>{patient.reasonRejectFin ? patient.reasonRejectFin.reason : null}</td>)
                :
                (
                <td>
                  <button title="Cancelar solicitud" type="button" className="btn btn-danger btn-xs" style={marginLeft}
                    onClick={()=> props.cancelPatientRequest(patient._id)}>
                    <span className="glyphicon glyphicon-remove-circle"></span>
                  </button>
                </td>
                )
              }
        </tr>)
      })
    return (
        <div>
            <div className="container">
                <div class="table-responsive">
                  <table className= "table">
                    <thead style={{border:"1px solid grey"}}>
                      <tr style={Object.assign({}, setRowColor('lightgrey'))}>
                        <th style={{border:"1px solid grey"}}>Fecha</th>
                        <th style={{border:"1px solid grey"}}>Operador Financiador</th>
                        <th style={{border:"1px solid grey"}}>Financiador</th>
                        <th style={{border:"1px solid grey"}}>Plan</th>
                        <th style={{border:"1px solid grey"}}>Paciente</th>
                        <th style={{border:"1px solid grey"}}>Edad</th>
                        <th style={{border:"1px solid grey"}}>Diagnóstico</th>

                        <th style={{border:"1px solid grey"}}>Institución</th>
                        <th style={{border:"1px solid grey"}}>Aceptó</th>
                        <th style={{border:"1px solid grey"}}>Confirmó</th>
                        <th style={{border:"1px solid grey"}}>Mensajes</th>
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