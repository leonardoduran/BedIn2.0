import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authentication from './authentication';
import formReducers from './formReducers';
import viewFinanciadores from './viewFinanciador';
import viewUser from './viewUser';
import viewHospitals from './viewHospital';
import patientRequestReducers from './patientRequestReducers';
import patients from './hospitalReducers/patients';

const rootReducer = combineReducers({
  authentication,
  formReducers,
  viewFinanciadores,
  viewUser,
  viewHospitals,
  patientRequestReducers,
  patients,
  routing: routerReducer
});

export default rootReducer;
