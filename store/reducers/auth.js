import { SIGNUP, SIGNIN, LOGOUT } from '../actions/auth';

const initialState = {
  name: null,
  email: null
};

export default (state=initialState, action) => {
  switch(action.type) {
    case SIGNUP:
      return {
        name: action.user.displayName,
        email: action.user.email
      };

    case SIGNIN:
      return {
        name: action.user.displayName,
        email: action.user.email
      };

    case LOGOUT: 
      return initialState;
    
    default:
      return state;
  }
};