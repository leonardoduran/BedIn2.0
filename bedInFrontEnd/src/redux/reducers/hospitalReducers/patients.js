function patients(state = {
		isRequesting: false,
		error: null,
		isSendingMsg : false,
		patientsData: [],
		viewedPatientsData: null

	}, action) {
	switch(action.type) {
		case 'USER_IS_LOGGED_OUT_H':
			return Object.assign({}, state, {
				isRequesting: false,
				error: null,
				isSendingMsg : false,
				patientsData: [],
				viewedPatientsData: null				
			})		
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

		case 'GET_REJECTED_PATIENTS': 
			return Object.assign({}, state, {
				isRequesting: false,
				rejectedPatientsData: action.rejectedPatients
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

		case 'SENDING_MESSAGE':
			return Object.assign({}, state, {
				isSendingMsg: true
			})

		case 'SENDING_MESSAGE_END':
			return Object.assign({}, state, {
				isSendingMsg: false
			})

		default: 
			return state
	}
}

export default patients;