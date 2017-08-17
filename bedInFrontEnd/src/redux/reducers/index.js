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
	authentication : authentication,
	formReducers: formReducers,
	viewFinanciadores: viewFinanciadores,
	viewUser: viewUser,
	viewHospitals: viewHospitals,
	patientRequestReducers: patientRequestReducers,
	patients: patients,
 	routing: routerReducer
})


export default rootReducer;
