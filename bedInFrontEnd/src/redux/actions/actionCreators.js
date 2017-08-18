// First to dispatch when making a request to server (get or post)
export function isRequestingToServer() {
 return {
   type: 'IS_REQUESTING_TO_SERVER_LOGIN',
 }
}

export function userIsLoggedIn(user) {
  return {
    type: 'USER_IS_LOGGED_IN',
    user
  }
}

export function userFailedToLogin(err) {
  return {
    type: 'USER_FAILED_TO_LOG_IN',
    err
  }
}

export function failedCheckLogin(err) {
  return {
    type: 'FAILED_CHECK_LOGIN',
    err
  }
}

export function userIsLoggedOut() {
 return {
   type: 'USER_IS_LOGGED_OUT',
 }
}

export function failedRequest(err) {
 return {
   type: 'FAILED_REQUEST',
   err
 }
}


export function loginFetch(username,password) {

  return (dispatch) => {
    dispatch(isRequestingToServer());

    const userData = {
      username,
      password
    };

    return fetch('./login', {
      method: 'POST',
      credentials: 'include',
      headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify(userData)
    })
    .then(response => {
      const test = response.json()
      return test
    }
      )
    .then(data => {
      if (data.error) return dispatch(userFailedToLogin(data.error));
      return dispatch(userIsLoggedIn(data));
    })
    .catch(err => dispatch(failedRequest(err)))
  };
};

export function checkLoginFetch() {
  return (dispatch) => {
    dispatch(isRequestingToServer());
    return fetch('./login', {
      credentials: 'include',
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) return dispatch(failedCheckLogin(data.error));
      return dispatch(userIsLoggedIn(data));
    })
    .catch(err => dispatch(failedRequest(err)))
  };
};


export function logoutFetch () {
  return (dispatch) => {
    dispatch(isRequestingToServer());
    return fetch('./logout', {
      credentials: 'include'
    })
    .then(() => dispatch(userIsLoggedOut()))
    .catch(err => dispatch(failedRequest(err)))
  }
};
