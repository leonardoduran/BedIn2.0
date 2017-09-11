
export function changingPassword() {
  return {
    type: 'CHANGING_PASSWORD',
  };
}

export function changingPasswordError() {
  alert("Error al actualizar la password")
  return {
    type: 'CHANGING_PASSWORD_END',
  };
}

export function changingPasswordEnd(newPass) {
  alert('Se cambió la password a '+ newPass)
  return {
    type: 'CHANGING_PASSWORD_END',
  };
}

export function changePass(userId) {
  let newPass = '1234';
  return (dispatch => {
    dispatch(changingPassword());
    const objRequest = {
        userId,
        newPass
    }
    return fetch('./bedin/users/changepass', {
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
      console.log("Data", data)
      if(!data.error) return dispatch(changingPasswordEnd(data.newPass))
      return dispatch(changingPasswordError(data.error))
    // .catch(err => dispatch(changingPasswordError(err)))
    })
  })
}