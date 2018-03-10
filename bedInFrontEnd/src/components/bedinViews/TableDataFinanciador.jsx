import React from 'react';

const marginLeft = {marginLeft:"5px"}

function TableDataFinanciador(props) {
	const allHospitals = hospitals => {
		return hospitals.map(singleHospital =>
			<p key = {singleHospital._id}> {singleHospital.name} </p>)
	}

	const tableBody = props.financiador.plans.map((plan, i) =>
    <tr key={i} style={{border:"1px solid black"}}>
      <td className="a6" >{plan.name}</td>
      <td className="a6" >{allHospitals(plan.hospitals)}
      </td>

      <td>
      	<button title="Agregar Hospital" type="button" className="btn btn-info btn-xs" style={marginLeft}
        	onClick={()=> props.updateFinanciador(plan, props.financiador)}>
            <span className="glyphicon glyphicon-edit"></span>
        </button>
      </td>

      <td>
      	<button title="Eliminar" type="button" className="btn btn-danger btn-xs" style={marginLeft}
        	onClick={()=> props.deleteFinanciador(plan,props.financiador)}>
            <span className="glyphicon glyphicon-remove"></span>
        </button>
      </td>

    </tr>)


	return (
		<div className="container">
      <div className="row">
    		<div className="col-xs-1 col-sm-1"></div>
    		<div className="col-xs-10 col-sm-10  ">
					<div>
						<p>NOMBRE:  {props.financiador.name}</p>
						<p>EMAIL: {props.financiador.email}</p>
						<p>TELÉFONO: {props.financiador.phone}</p>
						<p>DIRECCIÓN: {props.financiador.address}</p>

				      	<button title="Agregar Plan" type="button" className="btn"
				        	onClick={()=> props.addPlanFinanciador(props.financiador)}>
				        	Agregar Plan
				        </button>						
					</div>
					<table className= "table">
					  <thead className="a6">
					    <tr>
					      <th className="a6 b6">PLAN</th>
					      <th className="a6 b6">HOSPITALES</th>
						  <th className="a6 b6">ADD HTAL</th>
                          <th className="a6 b6">ELIMINAR</th>
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
