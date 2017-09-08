import React from 'react';

import moment from 'moment';

function TableViewRequestDetails(props) {
	const tableStyle = {border:"1px solid black"};
	const marginLeft = {marginLeft:"5px"};

	const buildDetailTable = (listOfPending = [], acceptedByHospital, idPending) => {
		console.log("listOfPending",listOfPending)
		return listOfPending.map(eachPending =>
			acceptedByHospital ?
			<p key={eachPending._id} >{eachPending.hospital.name}
      	<button type="button" className="btn btn-success btn-xs" style={marginLeft}
      		onClick={() => props.matchHospital(idPending,eachPending.hospital._id)}>
        	<span className="glyphicon glyphicon-ok"></span>
      	</button>
  		</p>
    	: <p key={eachPending._id}>{eachPending.hospital.name}</p>
		)
	}

	const tableBody = 
		<tr style={tableStyle}>
			<td style={tableStyle}>
				{buildDetailTable(props.patientDetail.allRequestedHospitals)}
			</td>
			<td style={tableStyle}>
				{buildDetailTable(props.patientDetail.viewedByHospitals)}
			</td>
			<td style={tableStyle}>
				{buildDetailTable(props.patientDetail.acceptedByHospital,true, props.patientDetail._id)}
			</td>
		</tr>

	return (
		<div>
			<table style={{border:"1px solid black"}} className= "table">
			  <thead style={{border:"1px solid black"}}>
			    <tr>
						<th style={{border:"1px solid black"}}>Instituciones Solicitadas</th>
		  			<th style={{border:"1px solid black"}}>Vista</th>
					  <th style={{border:"1px solid black"}}>Aceptada</th>
			    </tr>
			  </thead>
			  <tbody>
			  {tableBody}
			  </tbody>
			</table>
		</div>
	)
}

export default TableViewRequestDetails;
