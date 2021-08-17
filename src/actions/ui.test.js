import { types } from '../types/types';
import { finishLoading, setErrorAction, setRemoveErrorAction, startLoading } from "./ui";

describe('pruebas en el archivo ui.js', () => {
  test('Todas las acciones deben funcionar', () => {
    const error = setErrorAction('Hay un error!!');
    expect(error).toEqual({
      type: types.uiSetError,
      payload: 'Hay un error!!'
    })
  });

  const setRemoveErrorActionReturn = setRemoveErrorAction();
  const startLoadingReturn = startLoading();
  const finishLoadingReturn = finishLoading();
  
  expect(setRemoveErrorActionReturn).toEqual({
    type: types.uiRemoveError
  });
  
  expect(startLoadingReturn).toEqual({
    type: types.uiStartLoading
  });

  expect(finishLoadingReturn).toEqual({
    type: types.uiFinishLoading
  });

});
