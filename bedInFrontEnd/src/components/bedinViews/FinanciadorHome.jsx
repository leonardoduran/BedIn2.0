import React from 'react';
import { Link } from 'react-router'

import LargeButton from '../LargeButton.jsx';

function FinanciadorHome(props) {
  return (
    <div>
      <div className="container b4">
        <div className="row">
          <div className="col-xs-hidden col-sm-2 col-lg-2 col-xl-2"></div>
          <div className="col-xs-14 col-sm-4 col-lg-4 col-xl-4 ">
            <h2 className="e4 ">Solicitante</h2>
            <Link to="/Bedin/financiador/entcrear" className="btn icon-btn btn-info" id="c4">
            <span className="glyphicon a4 glyphicon-plus img-circle text-info"></span>
            Adherir Solicitante </Link>
            <Link to="/Bedin/financiador/entver" className="btn icon-btn btn-info" id="c4">
            <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info"></span>
            Lista de Solicitantes</Link>
          </div>
          <div className="col-xs-4 col-sm-4 col-lg-4 col-xl-2 ">
            <h2 className="e4">Usuarios </h2>
            <Link to="/Bedin/financiador/usercrear" className="btn icon-btn btn-info" id="c4">
            <span className="glyphicon a4 glyphicon glyphicon-user img-circle text-info"></span>
            Generar Usuario  </Link>
            <Link to="/Bedin/financiador/userver"  className="btn icon-btn btn-info" id="c4">
            <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info"></span>
            Lista de Usuarios </Link>
          </div>
        </div>
      </div>
      {props.children}
    </div>
  )
}

export default FinanciadorHome;
