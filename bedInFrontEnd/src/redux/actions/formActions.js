export function requestCreate() {
  return {
    type: 'REQUEST_CREATE',
  };
}

export function requestList() {
  return {
    type: 'REQUEST_LIST',
  };
}

export function receiveCreated(input) {
  return {
    type: 'RECEIVE_CREATED',
    input,
  };
}

export function receiveCreatedHospital(input) {
  return {
    type: 'RECEIVE_CREATED_HOSPITAL',
    input,
  };
}

export function receiveCreatedUser(input) {
  return {
    type: 'RECEIVE_CREATED_USER',
    input,
  };
}

export function receiveHospitals(hospitals) {
  return {
    type: 'RECEIVE_HOSPITALS',
    hospitals,
  };
}

export function receiveFinanciadors(financiadors) {
  return {
    type: 'RECEIVE_FINANCIADORS',
    financiadors,
  };
}

export function failedToCreate(err) {
  return {
    type: 'FAILED_TO_CREATE',
    err,
  };
}

export function failedRequest(err) {
  return {
    type: 'FAILED_REQUEST',
    err,
  };
}

export function resetCreateSuccess() {
  return {
    type: 'RESET_CREATE_SUCCESS',
  };
}

export function createEntidadFinanciadora(inputData) {
  return dispatch => {
    dispatch(requestCreate());
    return fetch('./bedin/healthcares', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(receiveCreated(data));
        } else {
          dispatch(failedToCreate(data.err));
        }
      })
      .catch(err => dispatch(failedRequest(err)));
  };
}

export function createEntidadHospital(inputData) {
  return dispatch => {
    dispatch(requestCreate());

    return fetch('./bedin/hospitals', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          dispatch(receiveCreatedHospital(data));
        } else {
          dispatch(failedToCreate(data.err));
        }
      })
      .catch(err => dispatch(failedRequest(err)));
  };
}

export function fetchHospitalList() {
  return dispatch => {
    dispatch(requestList());

    return fetch('./bedin/hospitals', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => dispatch(receiveHospitals(data)))
      .catch(err => dispatch(failedRequest(err)));
  };
}

export function fetchFinanciadorList() {
  return dispatch => {
    dispatch(requestList());

    return fetch('./bedin/healthcares', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => dispatch(receiveFinanciadors(data)))
      .catch(err => dispatch(failedRequest(err)));
  };
}

export function gettingHistoricalPatients() {
  return {
    type: 'REQUEST_LIST',
  };
}
export function receiveHistoricalPatients(patients) {
  return {
    type: 'RECEIVE_HIST_PATIENTS',
    patients,
  };
}
export function failedHistoricalPatients(err) {
  return {
    type: 'FAILED_HIST_PATIENTS',
    err,
  };
}

export function fecthHistoricalPatients(dateFrom, dateTo, hospitalId, healthcareId) {
  return dispatch => {
    dispatch(gettingHistoricalPatients());
    return fetch(
      `./patient/getAllWithFilter?dateFrom=${dateFrom}&dateTo=${dateTo}&hospitalId=${hospitalId}&healthcareId=${healthcareId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          dispatch(receiveHistoricalPatients(data));
        } else {
          dispatch(failedHistoricalPatients(data.err));
        }
      })
      .catch(err => dispatch(failedHistoricalPatients(err)));
  };
}

export function cleanHistoricalPatients() {
  return {
    type: 'CLEAR_HIST_PATIENTS',
  };
}

export function createUser(inputData) {
  return dispatch => {
    dispatch(requestCreate());

    return fetch('./bedin/users', {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          dispatch(receiveCreatedUser(data));
        } else {
          dispatch(failedToCreate(data.err));
        }
      })
      .catch(err => {
        dispatch(failedRequest(err));
      });
  };
}
