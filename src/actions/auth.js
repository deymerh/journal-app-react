import Swal from 'sweetalert2'
import { firebase, gogleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const loginWithEmailAndPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading())
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
        dispatch(finishLoading())
      })
      .catch(e => {
        dispatch(finishLoading())
        Swal.fire('Error', e.message, 'error');
      })
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
export const registerWithEmailPasswordName = (email, password, name) => {
  return (dispath) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispath(login(user.uid, user.displayName));
      })
      .catch(e =>{
        Swal.fire('Error', e.message, 'error');
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
export const startLogout = ()=>{
  return async (dispatch)=>{
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(resetNotes());
  }
}
export const logout = ()=>({
  type: types.logout
});
export const resetNotes = ()=>({
  type: types.notesLogoutCleaning
});