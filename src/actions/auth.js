import { firebase, gogleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';

export const loginWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(12345, 'Pedro'))
    }, 3500);
  };
};
export const startGoogleLogin = () => {
  return (dispath) => {
    firebase.auth().signInWithPopup(gogleAuthProvider)
      .then(({ user }) => {
        dispath(login(user.uid, user.displayName))
      })
  }
}
export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
});