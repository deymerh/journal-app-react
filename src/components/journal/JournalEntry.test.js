import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { JournalEntry } from './JournalEntry';
import { activeNote } from '../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {}
let store = mockStore(initState); 

describe('Pruabas en el <JournalEntry />', () => {
  const note = {
    id: 123456,
    date: 0,
    title: 'Hola',
    body: 'mundo',
    url: 'https://www.deymerh.co.mifoto.jpg'
  };
  test('Renderizarse correctamente - `[snapshot]`', () => {
    store.dispatch = jest.fn();
    const {container} = render(
      <Provider store={store}>
        <JournalEntry {...note}/>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test('Debe activar la nota', async() => {
    store.dispatch = jest.fn();
    const {findByTestId} = render(
      <Provider store={store}>
        <JournalEntry {...note}/>
      </Provider>
    );
    const selectNote = await findByTestId('selectNote');
    fireEvent.click(selectNote);
    expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, {...note}));
  });
  
});