export function isRequestingToServer() {
	return {
		type : 'IS_REQUESTING_TO_SERVER'
	}
}

export function getFinanciadores(financiadores) {
	return {
		type : 'GET_FINANCIADORES',
		financiadores
	}
}

export function failedRequest(err) {
	return {
		type : 'FAILED_REQUEST',
		err	
	}
	
}

export function fetchFinancidadores() {
	return (dispatch => {
		dispatch(isRequestingToServer());
		fetch('./bedin/healthcares', {
			method : 'GET',
			credentials : 'include'
		})
		.then(response => response.json())
		.then(financiadores => dispatch(getFinanciadores(financiadores)))
		.catch(err => dispatch(failedRequest(err)));
	})
}

export function isRemovingPlan() {
  return {
    type: 'IS_REQUESTING_TO_SERVER'
  }
}

export function removePlanSuccess() {
 //  return {
 //    type: 'FAILED_REQUEST',
 //    err
 // };
}

export function removePlanFailed(err) {
  return {
    type: 'FAILED_REQUEST',
    err
  }
}

export function isAddingPlan(){
  return {
    type: 'IS_REQUESTING_TO_SERVER'
  }
}
export function addPlanSuccess(){}

export function addPlanFailed(err){
  return {
    type: 'FAILED_REQUEST',
    err
  }
}

export function removePlanFinanciador(financiadorId,planId){

  return (dispatch => {
    dispatch(isRemovingPlan());
    const objRequest = {
      financiadorId,
      planId
    }
    return fetch('./bedin/healthcares/remove/', {
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

      if(!data.error) return dispatch(removePlanSuccess())
      return dispatch(removePlanFailed(data.error))
    })
  })
}

export function addHospitalFinanciador(financiadorId,planId,newHospitalId){
  return (dispatch => {
    dispatch(isAddingPlan());
    const objRequest = {
      financiadorId,
      planId,
      newHospitalId
    }
    return fetch('./bedin/healthcares/add/', {
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

      if(!data.error) return dispatch(addPlanSuccess())
      return dispatch(addPlanFailed(data.error))
    })
  })
}

export function getHospitals(hospitals) {
	return {
		type : 'GET_HOSPITALS',
		hospitals : hospitals
	}
}

export function fetchHospitals() {
	return (dispatch => {
		dispatch(isRequestingToServer());
		fetch('./bedin/hospitals', {
			method : 'GET',
			credentials : 'include'
		})
		.then(response => response.json())
		.then(hospitals => dispatch(getHospitals(hospitals)))
		.catch(err => dispatch(failedRequest(err)));
	})
}

export function addNewPlan(financiadorId,txtNewPlan){
   return (dispatch => {
    dispatch(isAddingPlan());
    const objRequest = {
      financiadorId,
      txtNewPlan
    }
console.log("Financ ID",objRequest)    
    return fetch('./bedin/healthcares/addPlan/', {
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

      if(!data.error) return dispatch(addPlanSuccess())
      return dispatch(addPlanFailed(data.error))
    })
  }) 
}