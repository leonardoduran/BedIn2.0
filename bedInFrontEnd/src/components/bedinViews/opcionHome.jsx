import React from 'react';

import LargeButton from '../LargeButton.jsx';

import { Link } from 'react-router';

function opcionHome(props) {
  return (
      <div>
        
        <div className="container-fluid b4">
          <div className="row flexItemss" >

            <div className="col-xs-8     col-sm-8   col-md-4 col-lg-4  ">
                <div className='flexItems' id="a7">
 
                  <h2 >Solicitante</h2>
                  <Link to="/Bedin/financiador/entcrear" className="btn icon-btn btn-info" id="c4a" >
                  <span className="glyphicon a4 glyphicon-plus img-circle text-info "></span>
                  Adherir Solicitante </Link>
                  <Link to="/Bedin/financiador/entver" className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info "></span>
                  Lista de Solicitantes </Link>
                  <Link to="/Bedin/financiador/usercrear" className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-user img-circle text-info "></span>
                  Generar Usuario  </Link>
                  <Link to="/Bedin/financiador/userver"  className="btn icon-btn btn-info" id="c4a">
                  <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info "></span>
                  Lista de Usuarios </Link>
         

                </div>
            </div>
            
            <div className="col-xs-8 col-sm-8    col-md-4  col-lg-4    ">
                <div className='flexItems' id="b7">
                  
                  <h2 >Prestador</h2>
                    <Link to="Bedin/hospital/entcrear" className="btn  btn-info" id="c4a">
                      <span className="glyphicon a4 glyphicon-plus img-circle text-info flex-item-center"></span>
                      Adherir Prestador
                    </Link>
                    <Link className="btn btn-info" id="c4a" to="/Bedin/hospital/entver">
                      <span className="glyphicon a4 glyphicon glyphicon-list img-circle text-info flex-item-center"></span>
                      Lista de Prestadores
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

            <div className="col-xs-8 col-sm-8  col-md-4 col-lg-4  ">
              <div className='flexItems' id="c7">

                <h2 >Administración</h2>
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

          

          </div>
        </div>

      </div>
    )
}

export default opcionHome;

// col-xs-6  col-xs-offset-1  col-sm-6 col-sm-offset-2   col-md-3  col-md-offset-0 