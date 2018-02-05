export function isRequestingToServer () {
    return {
        type: "IS_REQUESTING_TO_SERVER"
    }
}

export function isCheckRequestingToServer() {
    return {
        type: "IS_CHECK_REQUESTING_TO_SERVER"
    }
}

export function getPatients (patients) {
    return {
        type: "GET_PATIENTS",
        patients
    }
}

export function getReasons (reasons) {
    return {
        type: "GET_REASONS",
        reasons
    }
}

export function thereAreNewPatients () {
    return {
        type: "THERE_ARE_NEW_PATIENTS"
    }
}

export function getAcceptedPatients (acceptedPatients) {
    return {
        type: 'GET_ACCEPTED_PATIENTS',
        acceptedPatients
    }
}

export function getRejectedPatients (rejectedPatients) {
    return {
        type: 'GET_REJECTED_PATIENTS',
        rejectedPatients
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
        .then(patients => 
        {
            if (patients.error)
                alert(patients.error)
            else
                dispatch(getPatients(patients))
        })
        .catch(err => dispatch(failedToFetch(err)))
    })
}

export function fetchReasonReject () {
    return (dispatch => {
        dispatch(isRequestingToServer());
        return fetch('./hospital/patientRequest/reasonsReject', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(reasons => 
        {
            if (reasons.error)
                alert(reasons.error)
            else
                dispatch(getReasons(reasons))
        })
        .catch(err => dispatch(failedToFetch(err)))
    })
}

export function fetchGetPatientsCheck () {
    return (dispatch => {
        dispatch(isCheckRequestingToServer());
        return fetch('./hospital/patientRequest/check', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(objResp => 
        {
            if (objResp.cantidad>0)
// alert("Hay nuevas solicitudes sin recibir")
// Aca cambio el estado para muestrar el boton de nuevas solicitudes, que al apretarlo,
// ejecuta el fetch a la BD
                // fetchGetPatients();
            dispatch(thereAreNewPatients())
        })
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
            if (patients.error)
                alert(patients.error)
                else
            {
                (state === 'Aceptado') ? dispatch(getAcceptedPatients(patients)) 
                :(state === 'Rechazado') ? dispatch(getRejectedPatients(patients)) 
                :dispatch(getViewedPatients(patients))
            }
        })
        .catch(err => dispatch(failedToFetch(err)))
    })
}
export function fecthSetPatientState (idPatientRequest, state, mot) {
    return (dispatch => {
        dispatch(isRequestingToServer());
        const objRequest = {
            idPatientRequest,
            state,
            mot
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

export function sendingMessage () {
    return {
        type: "SENDING_MESSAGE",
    }
}

export function messageSendOk () {
    return {
        type: "SENDING_MESSAGE_END",
    }
}

export function messageSendError () {
    return {
        type: "SENDING_MESSAGE_END",
    }
}

export function sendMessageTo (patientId, hospitalId, userId,message){
    return (dispatch => {
    dispatch(sendingMessage());
    const objRequest = {
        patientId,
        hospitalId,
        userId,
        message
    }
    console.log("sendMessageTo ",objRequest)
    return fetch('./hospital/patientRequest/addMessage', {
      method: 'PUT',
      credentials: 'include',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
      body: JSON.stringify(objRequest)
    })
      .then(response => response.json())
      .then(data => dispatch(messageSendOk  (data)))
      .catch(err => dispatch(messageSendError(err)))
  });
}
