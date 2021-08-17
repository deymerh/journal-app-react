import { authReducer } from './authReducer';
import { types } from '../types/types';

describe('Pruebas en el authReducer.js', () => {
  
  test('Debe retornar el estado un usuario loggeado', () => {
    const InitialState = {};
    const actionLogin = {
      type: types.login,
      payload: {
        uid: 123456,
        displayName: 'Deymer'
      }
    };
    const stateReturn = authReducer(InitialState, actionLogin);
    expect(stateReturn).toEqual({ uid: 123456, name: 'Deymer'});
  });
  
  test('Debe retornar el estado vacio', () => {
    const InitialState = {
      uid: 123456,
      displayName: 'Deymer'
    };
    const actionLogin = {
      type: types.logout,
    };
    const stateReturn = authReducer(InitialState, actionLogin);
    expect(stateReturn).toEqual({});
  });

  test('No debe cambiar el estado si el action.type no es valido', () => {
    const InitialState = {
      uid: 123456,
      displayName: 'Deymer'
    };
    const actionLogin = {
      type: 'No Existo',
    };
    const stateReturn = authReducer(InitialState, actionLogin);
    expect(stateReturn).toEqual(InitialState);
  });
})
