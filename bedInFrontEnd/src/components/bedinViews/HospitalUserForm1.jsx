import React from 'react';


function HospitalUserForm(props) {

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

      <h2>Detalles de Usuario de Hospital</h2>

      <form onSubmit={props.createUser} className="form-horizontal">
        <div className="form-group ">
          <label htmlFor="exampleInputName2" className="col-sm-2 control-label">Nombre</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputEmail3" name="nombre" placeholder="Nombre"></input>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputName2" className="col-sm-2 control-label">Dirección</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputEmail3" name="direccion" placeholder="Dirección"></input>
            </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputnumber3" className="col-sm-2 control-label">Teléfono</label>
            <div className="col-sm-10">
              <input type="tel" className="form-control" id="inputEmail3" name="telefono" placeholder="Teléfono"></input>
            </div>
        </div>

        <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" name="email" placeholder="Email"></input>
              </div>
        </div>

        <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Username Temporario</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail3" name="username" placeholder="Username"></input>
              </div>
        </div>

        <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Password Temporario</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail3" name="password" placeholder="Password"></input>
              </div>
        </div>

        <div id="f1">
          <label>Seleccione Hospital del Usuario</label>
          {props.hospitals.map((hospital, i) =>
            <div key={i} id="g1">
              <input name="hospitals" type="radio" data-id={hospital._id} value={hospital.name} />{hospital.name}<br/>
            </div>
          )}
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
         <button className=" button" type="submit" value="Save" id="newbtn">Save</button>
          </div>
        </div>
      </form>

       </div>
      </div>
    </div>
    <div >{popup}</div>


    </div>

  )
}

export default HospitalUserForm;
