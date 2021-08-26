import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NoteScreen } from './NoteScreen';
import { activeNote } from '../../actions/notes';

jest.mock('../../actions/notes', ()=>({
  activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth:{},
  ui:{
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 123456,
      title: 'Hola',
      body: 'mundo',
      date: 0
    },
    notes:  []
  },
}
let store = mockStore(initState); 

describe('Pruebas en el <NoteScreen/>', () => {
  test('Debe mostrarse correctamente', () => {
    store.dispatch = jest.fn()
    const component = render(
      <Provider store={store}>
        <NoteScreen />
      </Provider>
    );
    expect(component).toMatchSnapshot()
  });

  test('Debe disparar el activeNote', async() => {
    store.dispatch = jest.fn()
    const {findByTestId} = render(
      <Provider store={store}>
        <NoteScreen />
      </Provider>
    );
    const titleField = await findByTestId('title');
    const bodyField = await findByTestId('body');
    fireEvent.change(titleField, {target: {value: "Hola"}});
    fireEvent.change(bodyField, {target: {value: "mundo"}});
    expect(activeNote).toHaveBeenLastCalledWith (123456, {"body": "mundo", "date": 0, "id": 123456, "title": "Hola"})
  });
  
});