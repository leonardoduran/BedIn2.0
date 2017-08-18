import React from 'react';

function Login (props) {
	return (
		<div>
			<div>

			</div>

			<div>
				<div className="container">
					<div className="row">
						<div className="col-xs-2 col-sm-4 col-lg-4"></div>
						<div className="col-xs-8 col-sm-4 col-lg-4 " id="a1">
							<form onSubmit = {(e) => {
								e.preventDefault();
								props.fetchLogin(`${e.target.username.value}`,`${e.target.password.value}`);
								}}>
								<div className="input-group">
									<span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
									<input id="email" type="text" className="form-control" name="username" placeholder="Username"></input>
								</div>

								<div className="input-group ">
									<span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
									<input id="password" type="password" className="form-control" name="password" placeholder="Password"></input>
								</div>
								<button type="submit" className=" button " id="newbtn">Login</button>
							
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login;