import React from 'react';
import { Link } from 'react-router';

function CreatePatientRequestForm(props) {
 let popup = null;
   if(props.success) {
      popup = (<div>
        <div className="modal-backdrop" id="modal-backdrop"></div>
        <div className="modal" id="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">La solicitud se ha generado exitosamente.</h4>
                </div>
                <div className="modal-footer ">
                          <Link to="/Financiador" >
                          <button type="submit" className=" button " data-dismiss="modal" id="newbtn11">Home</button></Link>
                </div>
              </div>
            </div>
        </div>
              </div>)
 }

  return (

    <div className="container container_a">
      <div className="row">
        <div className="col-xs-2 col-sm-4 col-lg-3"></div>
        <div className="col-xs-8 col-sm-6 col-lg-5 ">

          <h2>Generar Solicitud de Paciente</h2>

          <form className="form-horizontal" onSubmit={props.createRequest}>

            <div className="form-group ">
              <label htmlFor="exampleInputName2" className="col-sm-3 control-label">PACIENTE</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="dni" placeholder="Paciente"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sel1" className="control-label col-sm-3">Sexo</label>
              <div className="col-sm-9">
                <select className="form-control" id="sex-select">
                  <option value="select-sex">---Seleccione Sexo---</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputName2" className="col-sm-3 control-label">Edad</label>
                <div className="col-sm-9">
                  <input type="number" className="form-control" name="edad" placeholder="Edad"></input>
                </div>
            </div>

            <div className="form-group ">
              <label htmlFor="exampleInputName2" className="col-sm-3 control-label">Diagnostico CIE 10</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" name="cie" placeholder="CIE"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sel1" className="control-label col-sm-3">Complejidad de Cama</label>
              <div className="col-sm-9">
                <select className="form-control" name="complejidad" id="complexity-select">
                  <option value="select-option">---Seleccione Una Opción---</option>
                  <option>Neonatología</option>
                  <option>UTI Pediátrica</option>
                  <option>Sala Pediátrica</option>
                  <option>UTI Adultos</option>
                  <option>UCO</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sel1" className="control-label col-sm-3">Plan</label>
              <div className="col-sm-9">
                <select className="form-control" name="plan" id="plan-select">
                  <option>---Selecccione Plan del Paciente---</option>
                  {props.plans.map((plan, i) =>
                    <option key={i} value={plan._id}>{plan.name}</option>
                  )}
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-offset-3 col-sm-9">
                <button className="btn button" id="button2">Send</button>
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
