function viewHospitals (state = {
	hospitals : null,
	isRequesting : false,
	error : false
	}, action) {
	switch(action.type) {
		case 'USER_IS_LOGGED_OUT_VH':		
			return Object.assign({}, state, {
				hospitals : null,
				isRequesting : false,
				error : false
			});		
		case 'IS_REQUESTING_TO_SERVER': 
			return Object.assign({}, state, {
				isRequesting: true
			});
		case 'GET_HOSPITALS':
			return Object.assign({}, state, {
				isRequesting: false,
				hospitals: action.hospitals
			});
		case 'FAILED_REQUEST': 
			return Object.assign({}, state, {
				isRequesting: false,
				error: action.err
			})
		default:
			return state;
	}
}

export default viewHospitals;