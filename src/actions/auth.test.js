import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../types/types';
import { login, loginWithEmailAndPassword, logout, startLogout } from './auth';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {}
let store = mockStore(initState); 

describe('Pruebas en las acciones del Auth', () => {
  
  beforeEach(()=>{
    store = mockStore(initState);
  });

  test('login y logout deben realizar las acciones respectivas', () => {
    
    const uid = 'ABC1234';
    const displayName = 'Deymer';  
    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName
      }
    });
    expect(logoutAction).toEqual({
      type: types.logout
    });
  });
  
  test('Debe realizar el logout del usuario', async() => {
    await store.dispatch(startLogout());
    const actios = store.getActions();
    expect(actios[0]).toEqual({type: types.logout});
    expect(actios[1]).toEqual({type: types.notesLogoutCleaning});
  });
  
  test('Llamar la funcion `loginWithEmailAndPassword`', async() => {
    const email = 'deymer@hotmail.com';
    const password = '12356';
    await store.dispatch(loginWithEmailAndPassword(email, password));
    const actions = store.getActions();
    expect(actions[0]).toEqual({type: types.uiStartLoading});
  })
  
});
