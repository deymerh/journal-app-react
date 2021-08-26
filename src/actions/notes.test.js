import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { types } from '../types/types';
import { startLoadingNotes, startNewNote, startSaveNote, startUploadImg } from './notes';

jest.mock('../helpers/fileUpload', ()=>{
  return {
    fileUpload: ()=>{
      return Promise.resolve('https://hola-mundo/hola.jpg');
    }
  }
})

global.scrollTo = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING'
  },
  notes:{
    active:{
      id: '2NVrnHPXYLpxpEbx9xRG',
      title: 'Hola Amor',
      body: 'mundo',
      url: 'https://hola-mundo/hola.jpg'
    }
  }
}
let store = mockStore(initState); 
describe('Pruebas en notes.js', () => {
  
  beforeEach(()=>{
    store = mockStore(initState);
  });

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

  test('`startLoadingNotes` debe cargar las notas', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    }
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('`startSaveNote` debe actualizar la nota', async() => {
    const note = {
      id: '2NVrnHPXYLpxpEbx9xRG',
      title: 'MyTitle',
      body: 'MyBody'
    }
    await store.dispatch(startSaveNote(note));
    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdated);
    const docRef = await db.doc(`/TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toEqual(note.title);
  });
  
  test('`startUploadImg` debe actualizar el url de la nota activa', async() => {
    const image = new File([], 'file.jpg');
    await store.dispatch(startUploadImg(image));
    const actions = store.getActions();
  });
  
});
