export function isRequestingToServer() {
	return {
		type: 'IS_REQUESTING_TO_SERVER'
	}
}

export function getUserById (user) {
	return {
		type: 'GET_USER_BY_ID',
		user
	}
}

export function getUsersByType (users) {
	return {
		type: 'GET_USER_BY_TYPE',
		users
	}
}

export function passwordUpdated () {
	return {
		type: 'PASSWORD_UPDATED',
	}
}

export function faildToGetUser(err) {
	return {
		type: 'FAILED_TO_GET_USER',
		err	
	}
}

export function fetchGetUserById(id) {
	return (dispatch => {
		dispatch(isRequestingToServer());
		fetch(`./bedin/users/id`, {
			method: 'GET',
			credentials: 'include'
		})
		.then(result => result.json())
		.then(user => dispatch(getUserById(user)))
		.catch(error => dispatch(faildToGetUser(error)))
	})
}

export function fetchGetUsersByType(type) {
	return (dispatch => {
		dispatch(isRequestingToServer());
		fetch(`./bedin/users/type/${type}`, {
			method: 'GET',
			credentials: 'include',
		})
		.then(result => result.json())
		.then(users => dispatch(getUsersByType(users)))
		.catch(error => dispatch(faildToGetUser(error)))
	})
}

export function fetchChangePassword(oldPassword, newPassword) {
	return (dispatch => {
		dispatch(isRequestingToServer());
		const objReq = {
			anteriorPassword: oldPassword,
			nuevoPassword: newPassword
		}
		fetch(`./bedin/users`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
      body: JSON.stringify(objReq)
		})

		.then(result => result.json())
		.then(user => {
			if(user.error) return dispatch(faildToGetUser(user.error))
			return dispatch(passwordUpdated())
		})
		.catch(error => dispatch(faildToGetUser(error)))
	})

}