import React from 'react';
import { Link } from 'react-router';

function HospitalForm(props) {
   let popup = null;
   if(props.success) {
      popup = (<div>
        <div className="modal-backdrop" id="modal-backdrop"></div>
        <div className="modal" id="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">El hospital se ha creado exitosamente</h4>
                </div>
                <div className="modal-footer ">
                          <Link to="/Bedin" >
                          <button type="submit" className=" button " data-dismiss="modal" id="newbtn11">Home</button></Link>
                </div>
              </div>
            </div>
        </div>
              </div>)
  }

  return (
    <div>

      <div className="container container_a">
        <div className="row">
          <div className="col-xs-2 col-sm-2 col-lg-2"></div>
          <div className="col-xs-8 col-sm-8 col-lg-8 ">
            <h2>Detalles del prestador</h2>

            <div className="form-group ">
              <label htmlFor="exampleInputName2" className="col-sm-2 control-label">Nombre</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputNombre" name="nombre" placeholder="Nombre"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputName2" className="col-sm-2 control-label">Dirección</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="inputDireccion" name="direccion" placeholder="Dirección"></input>
                </div>
            </div>

            <div className="form-group">
              <label htmlFor="inputnumber3" className="col-sm-2 control-label">Teléfono</label>
                <div className="col-sm-10">
                  <input type="tel" className="form-control" id="inputTelefono" name="telefono" placeholder="Teléfono"></input>
                </div>
            </div>

            <div className="form-group">
               <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Email"></input>
                  </div>
            </div>
        
            <button id="newbtn1" onClick={props.createHospital}>Save</button>

          </div>
        </div>
      </div>
      <div>{popup}</div>

    </div>
  )
}

export default HospitalForm;

      // <form onSubmit={props.createHospital} className="form-horizontal">

        //       <div className="form-group">
        //   <div className="col-sm-offset-2 col-sm-10">
        //     <button className=" button" type="submit" value="Save" id="newbtn">Save</button>
        //   </div>
        // </div>