import React from 'react';

function CreatePatientRequestForm(props) {

   let popup = null;
   if(props.success) {
      popup = 
      <div>
        <div className="modal-backdrop" id="modal-backdrop"></div>
        <div className="modal" id="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                  <h4 className="modal-title">La solicitud se ha creado exitosamente</h4>
              </div>
              <div className="modal-footer ">
                <button type="button" onClick={props.createRequestOk} className=" button " data-dismiss="modal" id="newbtn11">Home</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  }

  return (

    <div className="container container_a">
      <div className="row">
        <div className="col-xs-2 col-sm-4 col-lg-2"></div>
        <div className="col-xs-8 col-sm-6 col-lg-6 ">

          <h2>Generar Solicitud de Paciente</h2>

          <form className="form-horizontal" onSubmit={props.createRequest}>

            <div className="form-group ">
              <label htmlFor="exampleInputName2" className="col-sm-3 control-label">Paciente</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="dni" id="dni" placeholder="Nombre y Apellido"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sel1" className="control-label col-sm-3">Sexo</label>
              <div className="col-sm-9">
                <select className="form-control" name="sexo" id="sexSelect">
                  <option>---Seleccione Sexo---</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputName2" className="col-sm-3 control-label">Edad</label>
                <div className="col-sm-9">
                  <input type="number" className="form-control" name="edad" id="edad" placeholder="Edad"></input>
                </div>
            </div>

            <div className="form-group ">
              <label htmlFor="exampleInputName2" className="col-sm-3 control-label">Diagnóstico</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="cie" id="cie" placeholder="Diagnóstico"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sel1" className="control-label col-sm-3">Complejidad de Cama</label>
              <div className="col-sm-9">
                <select className="form-control" name="complejidad" id="complexitySelect">
                  <option>---Seleccione Complejidad---</option>
                  <option>Guardia</option>
                  <option>Neonatología</option>
                  <option>Sala Común</option>
                  <option>Sala Pediátrica</option>
                  <option>UTI Pediátrica</option>
                  <option>UTI Adultos</option>
                  <option>UCO</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sel1" className="control-label col-sm-3">Plan</label>
              <div className="col-sm-9">
                <select className="form-control" name="plan" id="planSelect">
                  <option>---Selecccione Plan---</option>
                  {props.plans.map((plan, i) =>
                    <option key={i} value={plan._id}>{plan.name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button className="btn button" id="button2">Generar solicitud</button>
              </div>
            </div>

          </form>

        </div>
      </div>

      <div id="l">{popup}</div>

    </div>
  )
}

export default CreatePatientRequestForm;