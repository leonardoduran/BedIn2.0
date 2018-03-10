import React from 'react';
import { Link } from 'react-router';

function FinanciadorUserForm(props) {

   let popup = null;
   if(props.success) {
      popup = (<div>
        <div className="modal-backdrop" id="modal-backdrop"></div>
        <div className="modal" id="modal">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">El usuario solicitante se ha creado exitosamente</h4>
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
            <h2>Detalles de Usuario Financiador</h2>
            

            <div className="form-group">
              <label htmlFor="exampleInputName2" className="col-xs-2 col-sm-2 col-lg-2 control-label">Nombre</label>
              <div className="col-xs-10 col-sm-10 col-lg-10">
                <input type="text" className="form-control" id="inputNombre" name="nombre" placeholder="Nombre"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputName2" className="col-xs-2 col-sm-2 col-lg-2 control-label">Username</label>
              <div className="col-xs-10 col-sm-10 col-lg-10">
                <input type="text" className="form-control" id="inputUserName" name="username" placeholder="Username"></input>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputName2" className="col-xs-2 col-sm-2 col-lg-2 control-label">Password</label>
              <div className="col-xs-10 col-sm-10 col-lg-10">
                <input type="text" className="form-control" id="inputPass" name="password" placeholder="Password"></input>
              </div>
            </div>

            <div id="f1" className="form-group">
              <label>Seleccione Obra Social del Usuario</label>
               {props.financiadors.map((financiador, i) =>
                 <div key={i} id="g1">
                   <input id="inputFinanciadors" name="financiadors" type="radio" dataID={financiador._id} value={financiador._id} />{financiador.name}<br/>
                 </div>
               )}
             </div>

            <button id="newbtn1" onClick={props.createUser}>Save</button>
          </div>
        </div>
      </div>  
      <div >{popup}</div>
    </div>
  )
}

export default FinanciadorUserForm;