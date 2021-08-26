import '@testing-library/jest-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { login } from '../../actions/auth';
import { act } from 'react-dom/test-utils';
import { firebase } from '../../firebase/firebase-config';

jest.mock('../../actions/auth', ()=>({
  login: jest.fn()
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
      id: 'ABC'
    },
    notes:  []
  },
}
let store = mockStore(initState); 

describe('Prueba en el <AppRouter/>', () => {
  jest.setTimeout(9000)
  test('Debe llamar el login si estoy autenticado', async() => {
    store.dispatch = jest.fn()
    await act(async ()=>{
      let user;
      const userCred = await firebase.auth().signInWithEmailAndPassword('deymerh@deymerh.com', '123456');
      user = userCred.user;
      const component = render(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter/>
          </MemoryRouter>
        </Provider>
        );
    });
    expect(login).toHaveBeenCalledWith('iyx7yt0HXmbPXFmdqqV94bagcH43', null)
  });
  
});