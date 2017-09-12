
import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store'
import '../style/style.css';
import LoginContainer from './containers/LoginContainer.jsx';
import PerfilContainer from './containers/PerfilContainer.jsx';
import AccessRouting from './containers/AccessRouting.jsx';
import RedirectControl from './components/RedirectControl.jsx' 
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
import BedinAdminHome from './components/bedinViews/AdministradorHome.jsx';
import BedinAdminUserForm from './containers/AdminUserForm.jsx';
import BedinAdminUserViewData from './containers/BedinUserViewData.jsx';
import FinanciadorHome from './containers/financiadorContainers/FinanciadorHome.jsx';
import CreatePatientRequest from './containers/financiadorContainers/CreatePatientRequest.jsx';
import ViewPatientRequestsPending from './containers/financiadorContainers/ViewPatientRequestsPending.jsx';
import ViewPatientRequestsMatched from './containers/financiadorContainers/ViewPatientRequestsMatched.jsx';
import HospitalHome from './containers/hospitalContainers/HospitalHome.jsx';
import ViewHospitalPatientRequestsPending from './containers/hospitalContainers/ViewPatientRequestPending.jsx';
import ViewHospitalPatientRequestsAccepted from './containers/hospitalContainers/ViewPatientRequestAccepted.jsx';
import ViewHospitalPatientRequestsRejected from './containers/hospitalContainers/ViewPatientRequestRejected.jsx';
import ViewHospitalPatientRequestsViewed from './containers/hospitalContainers/ViewPatientRequestViewed.jsx';
import opcionalHome from './components/bedinViews/opcionHome.jsx';
//import {saveState} from './sessionStorage';
/*store.subscribe(() => {
  saveState(store.getState());
})*/
const router = (
  <Provider store={store}>
    <Router history={history}>
        
      <Route name="versions"  path="/login" component={LoginContainer}/>
        
      <Router path="/" component={AccessRouting}>
        
        <IndexRoute component={RedirectControl}/>
        <Route path="/Bedin" component={BedinHome}>
          <IndexRoute component={opcionalHome}/>
          <Route path="perfil" component={PerfilContainer}/>
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
            <IndexRoute component={BedinAdminHome}/>
            <Route path="usercrear" component={BedinAdminUserForm}></Route>
            <Route path="userver" component={BedinAdminUserViewData}/>
          </Route>
        </Route>
        <Route path="/Financiador" component={FinanciadorHome}>
          <Route path="perfil" component={PerfilContainer}/>
          <Route path="createrequest" component={CreatePatientRequest}/>
          <Route path="viewpending" component={ViewPatientRequestsPending}></Route>
          <Route path="viewmatched" component={ViewPatientRequestsMatched}></Route>
        </Route>
        <Route path="/Hospital" component={HospitalHome}>
          <Route path="perfil" component={PerfilContainer}/>
          <Route path="viewpending" component={ViewHospitalPatientRequestsPending}/>
          <Route path="viewaccepted" component={ViewHospitalPatientRequestsAccepted}/>
          <Route path="viewrejected" component={ViewHospitalPatientRequestsRejected}/>
          <Route path="viewViewed" component={ViewHospitalPatientRequestsViewed}/>
        </Route>      
      </Router>
    </Router>
  </Provider>
)
ReactDOM.render(router, document.getElementById('app'));