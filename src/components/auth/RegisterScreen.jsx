import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { setErrorAction, setRemoveErrorAction } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';
import { registerWithEmailPasswordName } from './../../actions/auth';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);
  const [formsValues, handleInputChange] = useForm({
    name: '',
    email: '',
    password: "",
    password2: "",
  });
  const handleRegister = (e) => {
    e.preventDefault();
    if (isForm()) {
      dispatch(registerWithEmailPasswordName(formsValues.email, formsValues.password, formsValues.name));
    }
  };
  const isForm = () => {
    if (formsValues.name.trim().length === 0) {
      dispatch(setErrorAction('Name is required'));
      return false;
    } else if (!validator.isEmail(formsValues.email)) {
      dispatch(setErrorAction('Email is required'));
      return false;
    } else if (formsValues.password !== formsValues.password2 || formsValues.password.length < 5) {
      dispatch(setErrorAction('Password should be at least 6 characters and match each other'));
      return false;
    }
    dispatch(setRemoveErrorAction());
    return true;
  };
  return (
    <div className="animate__animated animate__fadeIn animated__fater">
      <h1 className="auth__title">Register</h1>
      <form onSubmit={handleRegister}>
        {
          (msgError) &&
            <span className="auth__alert-error" data-testid="msgError">{msgError}</span>
        }
        <input
          autoComplete="off"
          className="auth__input"
          name="name"
          onChange={handleInputChange}
          placeholder="Nombre"
          type="text"
          value={formsValues.name}
          data-testid="name"
        />
        <input
          autoComplete="off"
          className="auth__input"
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
          type="email"
          value={formsValues.email}
          data-testid="email"
        />
        <input
          autoComplete="off"
          className="auth__input"
          name="password"
          onChange={handleInputChange}
          placeholder="Password"
          type="password"
          value={formsValues.password}
          data-testid="password"
        />
        <input
          autoComplete="off"
          className="auth__input"
          name="password2"
          onChange={handleInputChange}
          placeholder="Confirm"
          type="password"
          value={formsValues.password2}
          data-testid="password2"
        />
        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
          data-testid="btnRegister"
        >
          Register
        </button>
        <Link
          className="link"
          to="/auth/login"
        >
          Already registered?
        </Link>
      </form>
    </div>
  );
};