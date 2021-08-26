import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent,  } from '@testing-library/react';
import { LoginScreen } from './LoginScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { startGoogleLogin, loginWithEmailAndPassword } from '../../actions/auth';

jest.mock('../../actions/auth', (()=>({
  startGoogleLogin: jest.fn(),
  loginWithEmailAndPassword:jest.fn(),
})));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth:{},
  ui:{
    loading: false,
    msgError: null
  }
}
let store = mockStore(initState); 

describe('Pruebas en el <LoginScreen/>', () => {
  beforeEach(()=>{
    store = mockStore(initState);
    jest.clearAllMocks();
  });
  
  test('Debe hacer el Snapshot del componente', () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen/>
        </MemoryRouter>
      </Provider>
      );
    expect(component).toMatchSnapshot();
    
  });
  
  test('Clickear al boton de login con google y se ejecute la acción', async() => {
    store.dispatch = jest.fn();
    const {findByTestId} = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen/>
        </MemoryRouter>
      </Provider>
      );
    const loginGoogle = await findByTestId('withGoogle');
    fireEvent.click(loginGoogle);
    expect(startGoogleLogin).toHaveBeenCalled();
  });

  test('Click login y se ejecute la acción respectiva', async() => {
    store.dispatch = jest.fn();
    const {findByTestId} = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen/>
        </MemoryRouter>
      </Provider>
      );
    const login = await findByTestId('btnLogin');
    fireEvent.click(login);
    expect(loginWithEmailAndPassword).toHaveBeenCalledWith('','');
  });
  
});
