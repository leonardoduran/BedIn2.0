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
export function getViewedPatients (viewedPatients) {
    return {
        type: 'GET_VIEWED_PATIENTS',
        viewedPatients
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
export function fetchGetPatientsByState(state) {
    return (dispatch => {
        dispatch(isRequestingToServer())
        return fetch(`./hospital/patientRequest/${state}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(patients => {
            (state === 'Aceptado') ? dispatch(getAcceptedPatients(patients)) 
            : dispatch(getViewedPatients(patients))
        })
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
export function fetchSetAllViewed (patients) {
    return (dispatch => {
        dispatch(isRequestingToServer());
        const objRequest = {
            patients
        };
        return fetch('./hospital/patientRequest/allViewed', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
      body: JSON.stringify(objRequest)
        })
        .then(response => response.json())
        .then(data => dispatch(fetchGetPatients()))
        .catch(err => dispatch(failedToFetch()))
    })
}
