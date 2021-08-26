import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from './RegisterScreen';
import { registerWithEmailPasswordName } from '../../actions/auth';
import { types } from '../../types/types';

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
store.dispatch = jest.fn();

describe('Pruebas en el <RegisterScreen/>', () => {

  beforeEach(()=>{
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test('Debería hacer el snapshot', () => {
    const {container} = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  test('Debe llamar `registerWithEmailPasswordName y hacer el dispath de setErrror al store', async () => {
    const {findByTestId} = render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
    const inputField = await findByTestId('email');
    fireEvent.change(inputField, {target: {value: ""}});
    const btnRegister = await findByTestId('btnRegister');
    fireEvent.click(btnRegister);
    const actions = store.getActions();
    expect(actions[0]).toEqual({type: types.uiSetError, payload: 'Name is required'})
  });

  test('Debe mostrar la caja de alerta con el mensje de error del store', async() => {
    const initStateError = {
      auth:{},
      ui:{
        loading: false,
        msgError: 'El email es requerido'
      }
    }
    const storeError = mockStore(initStateError);
    const {getByTestId, container} = render(
      <Provider store={storeError}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );
    const msgError = await getByTestId('msgError');
    });
  
});
