import React from 'react';

function TableDataFinanciador(props) {

	const allHospitals = hospitals => {
		return hospitals.map(singleHospital =>
			<p key = {singleHospital._id}> {singleHospital.name} </p>)
	}

	const tableBody = props.financiador.plans.map((plan, i) =>
    <tr key={i} style={{border:"1px solid black"}}>
      <td className="a6" style={{border:"1px solid black"}}>{plan.name}</td>
      <td className="a6" style={{border:"1px solid black"}}>{allHospitals(plan.hospitals)}
      </td>
    </tr>)

	return (
		<div className="container">
      <div className="row">
    		<div className="col-xs-2 col-sm-4 col-lg-3"></div>
    		<div className="col-xs-8 col-sm-6 col-lg-6 ">
					<div>
						<p>NOMBRE:  {props.financiador.name}</p>
						<p>EMAIL: {props.financiador.email}</p>
						<p>TELÉFONO: {props.financiador.phone}</p>
						<p>DIRECCIÓN: {props.financiador.address}</p>
					</div>
					<table className= "table">
					  <thead className="a6">
					    <tr >
					      <th className="a6 b6">PLAN</th>
					      <th className="a6 b6">HOSPITALES</th>
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

export default TableDataFinanciador;
