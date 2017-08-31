import React from 'react';

import LargeButton from '../LargeButton.jsx';

import { Link } from 'react-router';

function opcionalHomeFinanciador(props) {
  return (
      <div>
        
        <div className="container-fluid b4">
          <div className="row" >
            <div className="col-xs-12 col-sm-2 col-lg-1  col-xl-1 " id="e7"  ></div>
            <div className="col-xs-12 col-sm-4 col-lg-3 col-xl-3 flex-item-center ">
            </div>
            
            <div className="col-xs-12 col-sm-4 col-lg-3 col-xl-3 oh text-aligt-center ">
                <div id="b71">
                  
                  <h2 className="text-xs-center ">Institución</h2>
                    <Link className="btn btn-info" id="c4a1" to="/Bedin/hospital/entver">
                      <span className="glyphicon a4 glyphicon glyphicon-list img-circle  flex-item-center" id="glyphicon-p"></span>
                      Solicitudes Pendientes
                    </Link>
   
                    <Link to="Bedin/hospital/usercrear" className="btn btn-info" id="c4a1">
                      <span className="glyphicon a4 glyphicon glyphicon-user img-circle  flex-item-center" id="glyphicon-p"></span>
                      Confirmados
                    </Link>      
                                    
                </div>
            </div>

            

            <div className="col-xs-12 col-sm-4 col-lg-1 col-xl-1 " id="d7"></div>

          </div>
        </div>

      </div>
    )
}

export default opcionalHomeFinanciador;

                    // <Link to="Bedin/hospital/entcrear" className="btn  btn-info" id="c4a1">
                    //   <span className="glyphicon a4 glyphicon-plus img-circle  flex-item-center" id="glyphicon-p"></span>
                    //   Generar Solicitud
                    // </Link>
