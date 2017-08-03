import React from 'react';

const tableStyle = {border:"1px solid black"};
const marginLeft = {marginLeft:"5px"}

const props = 
	{
		patients: [
			{
				documento: 3224973,
				plan: "01",
				CIE: "A01",
				complejidad: "Grado 1",
				allHospitals: [
					{
						name: 'Fleming',
						_id: '1'
					},
					{
						name: 'Los Arcos',
						_id: 2
					},
					{
						name: 'Padilla',
						_id: 3
					},	
				],
				viewedHospitals: [
					{
						name: 'Los Arcos',
						_id: 2
					},
					{
						name: 'Padilla',
						_id: 3
					},	
				],
				acceptedHospitals: [
					{
						name: 'Fleming',
						_id: '1'
					},
				]
			}
		],
		matchHospital: (e) => {
			e.preventDefault();
			alert('matcheado')

		}
	}


function TableViewPatientRequests() {
	
	const listHospitals = (hospitals, isAcceptedHospital) => {
		return hospitals.map(hospital => 
			isAcceptedHospital ? 
				<p key={hospital._id} >{hospital.name}
	      	<button type="button" 
	      		className="btn btn-success btn-xs"
	      		style={marginLeft}
	      		onClick={props.matchHospital}>
	        	<span className="glyphicon glyphicon-ok"></span>
	      	</button>
    		</p>
    	: <p key={hospital._id}>{hospital.name}</p>
    ) 
	}

	const tableBody = props.patients.map((patient, i) => 
		<tr style={tableStyle} key={patient.documento}>
			<td style={tableStyle}>{patient.documento}</td>
			<td style={tableStyle}>{patient.plan}</td>
			<td style={tableStyle}>{patient.CIE}</td>
			<td style={tableStyle}>{patient.complejidad}</td>
			<td style={tableStyle}>
				{listHospitals(patient.allHospitals)}
			</td>
			<td style={tableStyle}>
				{listHospitals(patient.viewedHospitals)}
			</td>
			<td style={tableStyle}>
				{listHospitals(patient.acceptedHospitals, true)}
			</td>
		</tr>)

	return (
		<div>
			<table style={{border:"1px solid black"}} className= "table">
			  <thead style={{border:"1px solid black"}}>
			    <tr>
			      <th style={{border:"1px solid black"}}>DNI</th>
			      <th style={{border:"1px solid black"}}>Plan</th>
			      <th style={{border:"1px solid black"}}>CIE</th>
			      <th style={{border:"1px solid black"}}>Complejidad</th>
			      <th style={{border:"1px solid black"}}>Hospitals</th>
			      <th style={{border:"1px solid black"}}>Vistos</th>
			      <th style={{border:"1px solid black"}}>Aceptados</th>
			    </tr>
			  </thead>
			  <tbody>
			  {tableBody}
			  </tbody>
			</table>
		</div>
	)
}

export default TableViewPatientRequests;