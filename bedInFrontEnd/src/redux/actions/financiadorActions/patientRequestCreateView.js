import * as actionCreators from '../actionCreators';

export function isRequestingToServer () {
    return {
        type: "IS_REQUESTING_TO_SERVER"
    }
}

export function requestCreate() {
  return {
    type: 'REQUEST_CREATE',
  };
}

export function receiveCreatedPatient(input) {
if(input.error){
  return{
   type: 'FAILED_TO_CREATE',
   input
  }
}
else{
  return {
    type: 'RECEIVE_CREATED_PATIENT',
    input
  }
}
}

export function failedToCreate(err) {
  return {
    type: 'FAILED_TO_CREATE',
    err
  }
}

export function failedRequest(err) {
  return {
    type: 'FAILED_REQUEST',
    err
  };
}

export function requestList() {
  return {
    type: 'REQUEST_LIST',
  };
}

export function receivePlans(plans) {
  return {
    type: 'RECEIVE_PLANS',
    plans
  };
}

export function resetCreateSuccess() {
  return {
    type: 'RESET_CREATE_SUCCESS',
  };
}

export function fetchPlanList() {
  return (dispatch) => {
    dispatch(requestList());

    return fetch('./healthcare/plans', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error)
          dispatch(receivePlans(data))
      })
      .catch(err => dispatch(failedRequest(err)))
  };
};

export function receiveDiagnosis(diagnosis) {
  return {
    type: 'RECEIVE_DIAGNOSIS',
    diagnosis
  };
}

export function fetchDiagnosis(){
  return (dispatch) => {
    dispatch(requestList());

    return fetch('./healthcare/diagnosis', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error)
          dispatch(receiveDiagnosis(data))})
      .catch(err => dispatch(failedRequest(err)))
  };
};

export function createPatientRequest(inputData) {
  return (dispatch) => {
    dispatch(requestCreate());
    return fetch('./healthcare/patientRequest', {
      method: 'POST',
      credentials: 'include',
      headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify(inputData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.error)
        {
          alert(data.error);
          dispatch(logoutFetchFinanc());
        }
      else
        {
          if(data) {
                  dispatch(receiveCreatedPatient(data))
                } else {
                  dispatch(failedToCreate(data.err))
                }
        }
      })
      .catch(err => dispatch(failedRequest(err)))
  };
};

export function receivePending(pending) {
  return {
    type: 'RECEIVE_PENDING',
    pending
  };
}

export function receiveMatched(matched) {
  // Tengo que identificar qué Item del array hospitalsAndState fue el que matcheó el financiador 
  return {
    type: 'RECEIVE_MATCHED',
    matched
  };
}

export function userIsLoggedOut() {
// Reseteo todas las variables de estado de todos los reducers
 return [
    {type: 'USER_IS_LOGGED_OUT_H'},
    {type: 'USER_IS_LOGGED_OUT_A'},
    {type: 'USER_IS_LOGGED_OUT_FR'},
    {type: 'USER_IS_LOGGED_OUT_PRR'},
    {type: 'USER_IS_LOGGED_OUT_VF'},
    {type: 'USER_IS_LOGGED_OUT_VH'},
    {type: 'USER_IS_LOGGED_OUT_VU'},]
}

export function logoutFetchFinanc () {
  return (dispatch) => {
    dispatch(isRequestingToServer());
    return fetch('./logout', {
      credentials: 'include'
    })
    .then(() => dispatch(userIsLoggedOut()))
    .catch(err => dispatch(failedRequest(err)))
  }
};


export function fetchPendingPatientRequests() {
  return (dispatch) => {
    dispatch(requestList());

    return fetch('./healthcare/patientRequest/pending', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error)
          {
              alert(data.error);
              dispatch(logoutFetchFinanc());
          }
        else
          dispatch(receivePending(data))
        })
      .catch(err => dispatch(failedRequest(err)))
  };
};

export function fetchMatchedPatientRequests() {
  return (dispatch) => {
    dispatch(requestList());
    return fetch('./healthcare/patientRequest/matched', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error)
        {
          alert(data.error);
          dispatch(logoutFetchFinanc());
        }
        else
          dispatch(receiveMatched(data))})
      .catch(err => dispatch(failedRequest(err)))
  };
};


export function matchWithHospital(patientRequestId, idHospital) {
  return (dispatch => {
    dispatch(requestList());
    const objRequest = {
      patientRequestId,
      idHospital
    }
    return fetch('./healthcare/patientRequest/matched', {
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
      if(!data.error) return dispatch(fetchPendingPatientRequests())
      return dispatch(failedRequest(data.error))
    .catch(err => dispatch(failedRequest(err)))
    })
  })
}

export function getReasonsF (reasonsF) {
    return {
        type: "RECEIVE_REASONS_F",
        reasonsF
    }
}

export function fetchReasonRejectFin(){
    return (dispatch => {
        dispatch(requestList());
        return fetch('./healthcare/patientRequest/reasonsRejectF', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(reasons => 
        {
            if (reasons.error)
                alert(reasons.error)
            else
                dispatch(getReasonsF(reasons))
        })
        .catch(err => dispatch(failedRequest(err)))
    })

}

export function setCancelToPatient(origin,patientIdCancel,mot){

    return (dispatch => {
        dispatch(requestList());
        const objRequest = {
            patientIdCancel,
            mot
        }
        return fetch('./healthcare/patientRequest/cancelPatient', {
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
            if (data.error) return dispatch(failedRequest())
            if (origin == 'GENERADOS')
              return dispatch(fetchPendingPatientRequests())
            else // CONFIRMADOS
              return dispatch(fetchMatchedPatientRequests())
        })
        .catch(err => dispatch(failedRequest()))
    })

}