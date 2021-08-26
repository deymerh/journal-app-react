import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Sidebar } from './Sidebar';
import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

jest.mock('../../actions/auth', (()=>({
  startLogout: jest.fn()
})));
jest.mock('../../actions/notes', (()=>({
  startNewNote: jest.fn()
})));

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
      id: 'ABC'
    },
    notes:  []
  },
}
let store = mockStore(initState); 

describe('Pruebas en el <Sidebar />', () => {
  
  beforeEach(()=>{
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  
  test('debe hacer el snapshot del componente', () => {
    const component = render(
      <Provider store={store}>
        <Sidebar/>
      </Provider>
    );
    expect(component).toMatchSnapshot();  
  });
    
  test('Debe hacer el logout', async() => {
    store.dispatch = jest.fn();
    const {findByTestId} = render(
      <Provider store={store}>
        <Sidebar/>  
      </Provider>
    );
    const btnLogout = await findByTestId('btnLogout');
    fireEvent.click(btnLogout);
    expect(startLogout).toHaveBeenCalled();
  });
  
  test('Debe activar llamar [startNewNote]', async() => {
    store.dispatch = jest.fn();
    const {findByTestId} = render(
      <Provider store={store}>
        <Sidebar/>  
      </Provider>
    );
    const newEntry = await findByTestId('newEntry');
    fireEvent.click(newEntry);
    expect(startNewNote).toHaveBeenCalled();
  });
    
});