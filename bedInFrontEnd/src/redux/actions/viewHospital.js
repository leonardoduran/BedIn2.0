export function isRequestingToServer() {
  return {
    type: 'IS_REQUESTING_TO_SERVER'
  };
}

export function getHospitals(hospitals) {
  return {
    type: 'GET_HOSPITALS',
    hospitals
  };
}

export function failedRequest(err) {
  return {
    type: 'FAILED_REQUEST',
    err
  };
}

export function fetchHospitals() {
  return dispatch => {
    dispatch(isRequestingToServer());
    fetch('./bedin/hospitals', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(hospitals => dispatch(getHospitals(hospitals)))
      .catch(err => dispatch(failedRequest(err)));
  };
}
