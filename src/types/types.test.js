import { types } from './types';

describe('Prubas en el types.js', () => {
  const typesMock = {
    login: '[Auth] Login',
    logout: '[Auth] Logout',

    uiSetError: '[UI] Set Error',
    uiRemoveError: '[UI] Remove Error',

    uiStartLoading: '[UI] Start loading',
    uiFinishLoading: '[UI] Finish loading',

    notesAddNew: '[Notes] New note',
    notesActive: '[Notes] Set actvated note',
    notesLoad: '[Notes] Load note',
    notesUpdated: '[Notes] Updated note',
    notesFileUrl: '[Notes] Updated image note',
    notesLogoutCleaning: '[Notes] Logout Cleaning',
    noteSelectDelete: '[Notes] Delete note',
  }
  test('Los tipos deben ser iguales', () => {
     expect(types).toEqual(typesMock);
  });
  
});
