function patients(state = {
		isRequesting: false,
		error: null,

		patientsData: [],
		viewedPatientsData: null

	}, action) {
	switch(action.type) {
		case 'IS_REQUESTING_TO_SERVER': 
			return Object.assign({}, state, {
				isRequesting: true
			})
		case 'GET_PATIENTS': 
			return Object.assign({}, state, {
				isRequesting: false,
				patientsData: action.patients
			})
		case 'GET_ACCEPTED_PATIENTS': 
			return Object.assign({}, state, {
				isRequesting: false,
				acceptedPatientsData: action.acceptedPatients
			})

		case 'GET_VIEWED_PATIENTS': 
			return Object.assign({}, state, {
				isRequesting: false,
				viewedPatientsData: action.viewedPatients
			})

		case 'FAILED_TO_GET_PATIENTS':
			return Object.assign({}, state, {
				isRequesting: false,
				error: action.err
			})
		default: 
			return state
	}
}

export default patients;