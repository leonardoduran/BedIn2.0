import React from 'react';
import moment from 'moment';

const tableStyle = {border:"1px solid grey"};
const tableStyle1 = {border:"1px solid grey", backgroundColor:"#E7E7CF"};
const marginLeft = {marginLeft:"50%"}
const marginLeftBtn = {marginLeft:"5px"}

function ViewTableReport(props) {
    let formattedDate =  function(date) {
        return moment(date).format('DD/MM/YYYY || HH:mm:ss');
    }

	const tableBody = props.patientsList.map((patient, i) =>
		<tr style={i%2==0 ? tableStyle : tableStyle1} key={patient._id} title= {patient.obs ? patient.obs : null}>
			<td>{patient.dni}</td>
			<td>{patient.age}</td>
			<td>{patient.sex}</td>
			<td>{patient.cie10}</td>
			<td>{patient.complexity}</td>
			<td>{formattedDate(patient.dateCreated)}</td>
        </tr>
		)	
	const setRowColor = (color) => ({backgroundColor : color})
	return (
		<div>
        <div className="container container_a">
          <div className="row">
            <div className="col-xs-2 col-sm-4 col-lg-1"></div>
            <div className="col-xs-8 col-sm-6 col-lg-10 " id="table_wrapper">

			<table style={{border:"1px solid grey"}} className= "table">
			  <thead style={{border:"1px solid grey"}}>
			    <tr style={Object.assign({}, setRowColor('lightgrey'))}>
					<th style={{border:"1px solid grey"}}>Paciente</th>
					<th style={{border:"1px solid grey"}}>Edad</th>
					<th style={{border:"1px solid grey"}}>Sexo</th>
					<th style={{border:"1px solid grey"}}>Diagnóstico</th>
					<th style={{border:"1px solid grey"}}>Complejidad de Cama</th>
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
		</div>
	)
}

export default ViewTableReport;