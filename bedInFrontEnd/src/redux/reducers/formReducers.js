function formReducers(state = {
  isRequesting: false,
  createSuccess: false,
  requestFail: false,
  error: null,
  name: null,
  address: null,
  phone: null,
  email: null,
  plans: [],
  type: null,
  osCode: null,
  hospitalCode: null,
  receiveHospitals: false,
  hospitals: [],
  receiveFinanciadors: false,
  financiadors: []
}, action) {
switch(action.type) {
  case 'REQUEST_CREATE':
    return Object.assign({}, state, {isRequesting: true});
  case 'RECEIVE_CREATED':
    return Object.assign({}, state, {
      isRequesting: false,
      createSuccess: true,
      name: action.input.name,
      address: action.input.address,
      phone: action.input.phone,
      email: action.input.email,
      plans: action.input.plans
    });
  case 'RECEIVE_CREATED_HOSPITAL':
    return Object.assign({}, state, {
      isRequesting: false,
      createSuccess: true,
      name: action.input.name,
      address: action.input.address,
      phone: action.input.phone,
      email: action.input.email
    })
  case 'RECEIVE_CREATED_USER':
    return Object.assign({}, state, {
      isRequesting: false,
      createSuccess: true,
      name: action.input.name,
      address: action.input.address,
      phone: action.input.phone,
      email: action.input.email,
      username: action.input.username,
      type: action.input.type
      // TODO: Add workplace id maybe
    })
  case 'FAILED_TO_CREATE':
    return Object.assign({}, state, {
      isRequesting: false,
      createSuccess: false,
      error: action.err
    });
  case 'REQUEST_LIST':
    return Object.assign({}, state, {isRequesting: true});
  case 'RECEIVE_HOSPITALS':
    return Object.assign({}, state, {
      isRequesting: false,
      receiveHospitals: true,
      hospitals: action.hospitals // receiving a hospitals array from server
    });
  case 'RECEIVE_FINANCIADORS':
    return Object.assign({}, state, {
      isRequesting: false,
      receiveFinanciadors: true,
      financiadors: action.financiadors // receiving a financiadors array from server
    });
  case 'FAILED_REQUEST':
    return Object.assign({}, state, {
      isRequesting: false,
      error: action.err
    });
  case 'RESET_CREATE_SUCCESS':
    return Object.assign({}, state, {createSuccess: false});
  default:
    return state;
}
return state;
}

export default formReducers;
