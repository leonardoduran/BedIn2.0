import React from 'react';

import LargeButton from '../LargeButton.jsx';

import { Link } from 'react-router';

function opcionHome(props) {
  return (
      <div>
        
        <div className="container-fluid b4">
          <div className="row" >
            <div className="col-xs-12 col-sm-2 col-lg-1  col-xl-1 " id="e7"  ></div>
            <div className="col-xs-12 col-sm-4 col-lg-3 col-xl-3 flex-item-center ">
                <div id="a7">
 
                  <h2 className="text-xs-center">Obra Social</h2>
                  <Link to="/Bedin/financiador/entcrear" className="btn icon-btn btn-info" id="c4a" >
                  <span className="glyphicon a4 glyphicon-plus img-circle text-info flex-item-center"></span>
                  Adherir Obra Social </Link>
                  <Link to="/Bedin/financiador/entver" className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info flex-item-center"></span>
                  Obras Sociales</Link>
                  <Link to="/Bedin/financiador/usercrear" className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-user img-circle text-info flex-item-center"></span>
                  Generar Usuario  </Link>
                  <Link to="/Bedin/financiador/userver"  className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info flex-item-center"></span>
                  Lista de Usuarios </Link>
         

                </div>
            </div>
            
            <div className="col-xs-12 col-sm-4 col-lg-3 col-xl-3 oh text-aligt-center ">
                <div id="b7">
                  
                  <h2 className="text-xs-center ">Hospital</h2>
                    <Link to="Bedin/hospital/entcrear" className="btn  btn-info" id="c4a">
                      <span className="glyphicon a4 glyphicon-plus img-circle text-info flex-item-center"></span>
                      Adherir Hospital
                    </Link>
                    <Link className="btn btn-info" id="c4a" to="/Bedin/hospital/entver">
                      <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info flex-item-center"></span>
                      Lista de Hospitales
                    </Link>
   
                    <Link to="Bedin/hospital/usercrear" className="btn btn-info" id="c4a">
                      <span className="glyphicon a4 glyphicon glyphicon-user img-circle text-info flex-item-center"></span>
                      Generar Usuario
                    </Link>
                    <Link to="/Bedin/hospital/userver" className="btn   btn-info" id="c4a">
                      <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info flex-item-center"></span>
                      Lista de Usuarios
                    </Link>          
                                    
                </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-lg-3 col-xl-3 oh ">
              <div id="c7">

                <h2 className=" text-xs-center">Administración</h2>
                <Link to="/Bedin/administrador/usercrear" className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-user img-circle text-info flex-item-center "></span>
                  Generar Usuario
                </Link>
                <Link to="/Bedin/administrador/userver" className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info flex-item-center"></span>
                  Lista de Usuarios
                </Link>                 
                
               </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-lg-1 col-xl-1 " id="d7"></div>

          </div>
        </div>

      </div>
    )
}

export default opcionHome;