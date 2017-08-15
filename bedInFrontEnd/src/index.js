
import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute } from 'react-router';

import { Provider } from 'react-redux';

import store, { history } from './redux/store'

import '../style/style.css';


import LoginContainer from './containers/LoginContainer.jsx';
import BedinHome from './components/bedinViews/BedinHome.jsx';

import BedinFinanciadorHome from './components/bedinViews/FinanciadorHome.jsx';
import BedinFinanciadorForm from './containers/FinanciadorForm.jsx';
import BedinFinanciadorViewData from './containers/FinanciadorViewData.jsx';
import BedinFinanciadorUserViewData from './containers/FinanciadorUserViewData.jsx';
import BedinFinanciadorUserForm from './containers/FinanciadorUserForm.jsx';

import BedinHospitalHome from './components/bedinViews/HospitalHome.jsx';
import BedinHospitalForm from './containers/HospitalForm.jsx';
import BedinHospitalViewData from './containers/HospitalViewData.jsx';
import BedinHospitalUserViewData from './containers/HospitalUserViewData.jsx';
import BedinHospitalUserForm from './containers/HospitalUserForm.jsx';

import AdministradorHome from './components/bedinViews/AdministradorHome.jsx';
import AdministradorUserForm from './containers/AdminUserForm.jsx';
import AdministradorUserViewData from './containers/BedinUserViewData.jsx';

import PerfilContainer from './containers/PerfilContainer.jsx';


//import FinanciadorHomeTestCSS from './containers/financiadorContainers/FinanciadorHomeTestCSS.jsx'
import CreatePatientContainerTestCSS from './containers/financiadorContainers/CreatePatientContainerTestCSS.jsx'
import ViewPatientRequestsTestCSS from './containers/financiadorContainers/ViewPatientRequestsTestCSS.jsx'
import opcionalHome from './components/bedinViews/opcionHome.jsx';
import opcionalHomeFinanciador from './components/financiadorViews/opcionalHomeFinanciador.jsx';


const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={LoginContainer}/>

      <Route path="/Bedin" component={BedinHome}>
        <IndexRoute component={opcionalHome}/>
        <Route path="perfil/:id" component={PerfilContainer}/>
        
        <Route path="financiador">
          <IndexRoute component={BedinFinanciadorHome}/>
          <Route path="entcrear" component={BedinFinanciadorForm}/>
          <Route path="entver" component={BedinFinanciadorViewData}/>
          <Route path="usercrear" component={BedinFinanciadorUserForm}/>
          <Route path="userver" component={BedinFinanciadorUserViewData}/>
        </Route>

        <Route path="hospital">
          <IndexRoute component={BedinHospitalHome}/>
          <Route path="entcrear" component={BedinHospitalForm}/>
          <Route path="entver" component={BedinHospitalViewData}/>
          <Route path="usercrear" component={BedinHospitalUserForm}/>
          <Route path="userver" component={BedinHospitalUserViewData}/>
        </Route>
        
        <Route path="administrador" >
          <IndexRoute component={AdministradorHome}/>
          <Route path="usercrear" component={AdministradorUserForm }></Route>
          <Route path="userver" component={AdministradorUserViewData}/>
        </Route>

      </Route>

      <Route path="/Financiador">
        <IndexRoute component={ViewPatientRequestsTestCSS}/>
      </Route> 

      <Route path="/Hospital">

      </Route>

    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('app'));
