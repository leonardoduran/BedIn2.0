import React from 'react';

import { Link } from 'react-router';

function GlobalNavbar (props) {
  const links = props.data.linkArray.map((linkData,i) => 
    <li className="margenes" key={i}>
      <Link to = {`${linkData.route}`}>{linkData.name}</Link>
    </li>      
  )
  const logo = props.data.logo; 
  return (

    <div>
      
      <nav className="navbar navbar-default" id="b3" >
        <div className="container-fluid" >

          <div className="navbar-header">
                  <button type="c3" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span className="sr-only">Toggle navigation</span>
                  </button>
            <Link to="/" className="navbar-brand"><img src="/public/img/drawing2.png" width="60" height="20" alt=""></img></Link>
            </div>
                <div className="collapse navbar-collapse e3">
                  <ul className="nav navbar-nav" id="d3" >
                   {links}
                  </ul>
            <ul className="nav navbar-nav navbar-right">
                    <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span className="glyphicon glyphicon-user" id="f3"></span>USUARIO <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                        <li><Link to="#">Perfil</Link></li>
                        <li><Link to="#">Log Out <span className="glyphicon glyphicon-off"  aria-hidden="true" id="e3"></span></Link></li>
                </ul>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default GlobalNavbar;
