function viewUser (state = {
	isRequesting: false,
	users: null,
	error: null
},action) {

	switch(action.type){
		case 'IS_REQUESTING_TO_SERVER': 
			return Object.assign({}, state, {
				//users: null,
				isRequesting: true
			}) 
		case 'GET_USER_BY_ID': 
			return Object.assign({}, state, {
				isRequesting: false,
				users: action.user,
				error: null
			})
		case 'GET_USER_BY_TYPE': 
			return Object.assign({}, state, {
				isRequesting: false,
				users: action.users
			})
		case 'PASSWORD_UPDATED': 
			return Object.assign({}, state, {
				isRequesting: false,
				error: null
			})
		case 'FAILED_TO_GET_USER':
			return Object.assign({}, state, {
				isRequesting: false,
				error: action.err
			})
		default:
			return state
	}
}

export default viewUser;