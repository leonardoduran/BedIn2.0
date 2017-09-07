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
        dispatch(receivePlans(data))})
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
        if(data) {
          dispatch(receiveCreatedPatient(data))
        } else {
          dispatch(failedToCreate(data.err))
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
  return {
    type: 'RECEIVE_MATCHED',
    matched
  };
}

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
      .then(data => dispatch(receivePending(data)))
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
      .then(data => dispatch(receiveMatched(data)))
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
      method: 'POST',
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
