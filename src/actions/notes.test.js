import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { startNewNote } from './notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: 'TESTING'
  }
}); 

describe('Pruebas en notes.js', () => {
  
  test('Debe crear una nota', async() => {
    
    await store.dispatch(startNewNote());
    const actions = store.getActions();
    
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      }
    });
    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      }
    });
    await db.doc(`/TESTING/journal/notes/${actions[0].payload.id}`).delete();
  });
  
});
