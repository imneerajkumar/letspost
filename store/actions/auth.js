import { Alert } from 'react-native';
import { auth } from '../../config/firebase';

export const SIGNIN = 'SIGNIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT = 'LOGOUT';

export const signIn = (email, password) => {
  return async dispatch => {
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => Alert.alert('An error occured', error.message, [{text: "Okay"}]));

    let user = null;
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch({ type: SIGNIN, user: authUser });
      } 
    });
  };
}

export const signUp = (username, email, password) => {
  return async dispatch => {
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => Alert.alert('An error occured', error.message, [{text: "Okay"}]));
  
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        dispatch({ type: SIGNUP, user: authUser });
      } 
    });
  };
}

export const logout = () => {
  return async dispatch => {
    auth.signOut();
    auth.onAuthStateChanged((authUser) => {
      if(!authUser){
        dispatch({type: LOGOUT});
      } 
    });
  }
}