import React from 'react';

function UserInformation(props) {
	console.log(props)
	return (
		<div className="container">
			<form >
			  <div className="form-group col-xs-6">
			    <label htmlFor="name">Nombre:</label>
			    <input className="form-control" type="text" name="name" disabled value={props.users.name}/>
			  </div>
			  <div className="form-group col-xs-6">
			    <label htmlFor="username">Nombre de usuario:</label>
			    <input className="form-control" type="text" name="username" disabled value={props.users.username}/>
			  </div>
			  <div className="form-group col-xs-6">
			  	<label htmlFor="tipo">Tipo:</label>
			    <input className="form-control" type="text" name="type" disabled value={props.users.type}/>
			  </div>
			  <div className="form-group col-xs-6">
			    <label htmlFor="tipo">Rol:</label>
			    <input className="form-control" type="text" name="rol" disabled value={props.users.rol}/>
				</div>
				<div className="form-group col-xs-6">
			    <label htmlFor="tipo">Contraseña anterior</label>
			    <input className="form-control" id="oldPassword" type="password"/>
				</div>
				<div className="form-group col-xs-6">
			    <label htmlFor="tipo">Nueva Contraseña</label>
			    <input className="form-control" id="newPassword" type="password"/>
				</div>
        <div className="form-group col-xs-6" style={{marginTop:"20px"}}>
            <button onClick={props.changePassword} className=" btn button">Modificar contraseña</button>
        </div>				
			</form>
		</div>
	)
}
		
export default UserInformation;