    import React from 'react';

import { Link } from 'react-router';
                
function GlobalNavbar (props) {
  const links = props.data.linkArray.map((linkData,i) => 
    <li className="nav-item" key={i}>
      <Link className="nav-link" activeClassName= 'active' to = {`${linkData.route}`}>{linkData.name}</Link>
    </li>      
  )
  const logo = props.data.logo; 
  return (

    <div>

    
      <header id="header-container" style={{backgroundColor:props.data.color}}>
        <div className="container">
          <div className="row flex-items-xs-middle">
            <div className="col-xs-6 columna">
              <h1>BdIn</h1>
            </div>

            <div className="col-xs-6 columna text-xs-right">
              <div>
              
                <ul className="nav navbar-nav navbar-right ">
                  <li className="dropdown">
                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="aLog">{props.username}
                      </a>
                    <ul className="dropdown-menu text-xs-right" id="bLog" >
                      <li><Link to={`/${props.data.userType}/perfil`} id="color"  >Perfil</Link></li>
                      <li><Link onClick={props.logOut} to="#" id="color">Log Out </Link></li>
                    </ul>
                  </li>

                </ul>

              </div>



            </div>
          </div>
        </div>
      </header>

      <nav id="menu-container" className="navbar navbar-light">
        <div className="container">
          <div className="row">
            <div className="col-xs-10 col-md-6">
              <ul className="nav navbar-nav">

                {links} 

              </ul>

            </div>
          </div>
        </div> 
      </nav> 

    </div>
  )
}

export default GlobalNavbar;
