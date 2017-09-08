function authentication (state = { 
    isRequesting: false,
    isLoggedIn: false,
    errorCredentials: null,
    errorCheckLogin: null,
    userName : null,
    userType : null,
    userId: null,
    userData : null,
    error: null
  }, action) {
  switch(action.type) {
    case 'IS_REQUESTING_TO_SERVER_LOGIN':
      return Object.assign({}, state, {isRequesting: true});
    case 'USER_IS_LOGGED_IN':
      return Object.assign({}, state, {
        isRequesting: false,
        isLoggedIn: true,
        userType: action.user.type,
        userName: action.user.name,
        userData : action.user.data,
        userId: action.user.id,
        institucionCode : action.user.institucionCode,
        errorCheckLogin : false,
        errorCredentials: false  
      });
    case 'USER_FAILED_TO_LOG_IN':
      return Object.assign({}, state, {
        isRequesting: false,
        isLoggedIn: false,
        userName : null,
        userType : null,
        userId: null,
        userData : null,
        errorCredentials : action.err
      });
    case 'FAILED_CHECK_LOGIN':
      return Object.assign({}, state, {
        isRequesting: false,
        isLoggedIn: false,
        userName : null,
        userType : null,
        userId: null,
        userData : null,
        errorCheckLogin: action.err
      });
    case 'USER_IS_LOGGED_OUT' : 
      return Object.assign({}, state, {
        isRequesting: false,
        isLoggedIn: false,
        userType: null,
        userName: null,
        userData : null
      });
    case 'FAILED_REQUEST':
      return Object.assign({}, state, {
        isRequesting: false,
        error: action.err
      });
    default:
      return state;
  }
  return state;
}

export default authentication;