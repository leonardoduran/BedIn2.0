import React from 'react';
import moment from 'moment';
function ViewPatientRequestsPendingTable(props) {
    const tableStyle = {border:"1px solid grey"};
    const marginLeft = {marginLeft:"5px"};
    let formattedDate =  function(date) {
        return moment(date).format('DD/MM/YYYY || HH:mm:ss');
    }
    const setRowColor = (color) => ({backgroundColor : color})  
    const buildPendingTable = (listOfPending = [], acceptedByHospital, idPending) => {
        return listOfPending.map(eachPending =>
            acceptedByHospital ?
            <p key={eachPending._id} >{eachPending.hospital.name}
        <button type="button" className="btn btn-success btn-xs" style={marginLeft}
            onClick={() => props.matchHospital(idPending,eachPending.hospital._id)}>
            <span className="glyphicon glyphicon-ok"></span>
        </button>
        </p>
        : <p key={eachPending.hospital._id}>{eachPending.hospital.name}</p>
        )
    }
    const tableBody = props.listOfPending.map((pending, i) => {
        let colorStyle = (pending.timeout) ? setRowColor('pink')
        : (pending.viewedByHospitals.length) ? setRowColor('lightblue')
        : (pending.acceptedByHospital.length) ? setRowColor('lightgreen')
        : setRowColor(null)
        
        return ( <tr style={Object.assign({}, tableStyle, colorStyle)} key={pending._id}>
                <td style={tableStyle}>{pending.dni}</td>
                <td style={tableStyle}>{pending.age}</td>
                <td style={tableStyle}>{pending.sex}</td>
                <td style={tableStyle}>{pending.cie10}</td>
                <td style={tableStyle}>{pending.complexity}</td>
                <td style={tableStyle}>{pending.healthcareplan.name}</td>
                <td style={tableStyle}>{formattedDate(pending.dateCreated)}</td>
                <td style={tableStyle}>
                    <a style={{cursor: "pointer", color: "blue"}} onClick={() => props.openModal(pending)}>Ver</a>
                </td>
            </tr>
            )
        })
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
                    <th style={{border:"1px solid grey"}}>Plan</th>
                    <th style={{border:"1px solid grey"}}>Fecha/Hora Creado</th>
                    <th style={{border:"1px solid grey"}}>Detalle</th>
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