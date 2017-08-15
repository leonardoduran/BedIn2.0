import React from 'react';

import LargeButton from '../LargeButton.jsx';

import { Link } from 'react-router';

function HospitalHome(props) {
  return (
    <div>
      <div className="container b4">
        <div className="row">
          <div className="col-xs-hidden col-sm-2 col-lg-2 col-xl-2"></div>
          <div className="col-xs-12 col-sm-4 col-lg-4 col-xl-4 ">

            <h2 className="e4">Hospital</h2>

            <Link to="Bedin/hospital/entcrear" className="btn  btn-info" id="c4">
              <span className="glyphicon a4 glyphicon-plus img-circle text-info"></span>
              Adherir Hospital
            </Link>

            <Link className="btn btn-info" id="c4" to="/Bedin/hospital/entver">
              <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info"></span>
              Lista de Hospitales
            </Link>

          </div>

          <div className="col-xs-12 col-sm-4 col-lg-4 col-xl-2 ">

            <h2 className="e4">Usuarios </h2>

            <Link to="Bedin/hospital/usercrear" className="btn btn-info" id="c4">
              <span className="glyphicon a4 glyphicon glyphicon-user img-circle text-info"></span>
              Generar Usuario
            </Link>

            <Link to="/Bedin/hospital/userver" className="btn   btn-info" id="c4">
              <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info"></span>
              Lista de Usuarios
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalHome;
