export function isRequestingToServer () {
	return {
		type: "IS_REQUESTING_TO_SERVER"
	}
}

export function getPatients (patients) {
	return {
		type: "GET_PATIENTS",
		patients
	}
}

export function getAcceptedPatients (acceptedPatients) {
	return {
		type: 'GET_ACCEPTED_PATIENTS',
		acceptedPatients
	}
}

export function failedToSetPatientStatus(err) {
	return {
		type: "FAILED_TO_SET_PATIENT_STATUS",
		err
	}
}

export function failedToFetch (err) {
	return {
		type: "FAILED_TO_FETCH",
		err
	}
}

export function fetchGetPatients () {
	return (dispatch => {
		dispatch(isRequestingToServer());
		return fetch('./hospital/patientRequest', {
			method: 'GET',
			credentials: 'include'
		})
		.then(response => response.json())
		.then(patients => dispatch(getPatients(patients)))
		.catch(err => dispatch(failedToFetch(err)))
	})
} 

export function fetchGetAcceptedPatients() {
	return (dispatch => {
		dispatch(isRequestingToServer())
		return fetch('./hospital/patientRequest/accepted', {
			method: 'GET',
			credentials: 'include'
		})
		.then(response => response.json())
		.then(acceptedPatients => dispatch(getAcceptedPatients(acceptedPatients)))
		.catch(err => dispatch(failedToFetch(err)))
	})
}

export function fecthSetPatientState (idPatientRequest, state) {
	return (dispatch => {
		dispatch(isRequestingToServer());
		const objRequest = {
			idPatientRequest,
			state
		}
		return fetch('./hospital/patientRequest', {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify(objRequest)
		})
		.then(response => response.json())
		.then(data => {
			if (data.error) return dispatch(failedToSetPatientStatus())
			return dispatch(fetchGetPatients())
		})
		.catch(err => dispatch(failedToFetch()))
	})
}