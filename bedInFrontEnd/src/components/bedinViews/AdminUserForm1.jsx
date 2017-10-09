import React from 'react';


function AdminUserForm(props) {
  return (
    <div>

        <div className="container container_a">
          <div className="row">
            <div className="col-xs-2 col-sm-2 col-lg-2"></div>
            <div className="col-xs-8 col-sm-8 col-lg-8 ">

      <h2>Detalles de Usuario Bedin</h2>

      <form onSubmit={props.createUser} className="form-horizontal">
        <div className="form-group ">
          <label htmlFor="exampleInputName2" className="col-sm-2 control-label">Nombre</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="inputEmail3" name="nombre" placeholder="Nombre"></input>
          </div>
        </div>

        <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Username Temporal</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail3" name="username" placeholder="Username"></input>
              </div>
        </div>

        <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Password Temporal</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="inputEmail3" name="password" placeholder="Password"></input>
              </div>
        </div>

        <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" name="email" placeholder="Email"></input>
              </div>
        </div>

        <div className="form-group">
          <label htmlFor="inputnumber3" className="col-sm-2 control-label">Teléfono</label>
            <div className="col-sm-10">
              <input type="tel" className="form-control" id="inputEmail3" name="telefono" placeholder="Teléfono"></input>
            </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" value="Save" className=" button" id="newbtn">Save</button>
          </div>
        </div>
      </form>



        </div>
      </div>
    </div>


    </div>

  )
}

export default AdminUserForm;
