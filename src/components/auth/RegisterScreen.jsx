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
    name: 'Deymer',
    email: 'deymerh@hotmail.com',
    password: "123456",
    password2: "123456",
  });
  const {
    name,
    email,
    password,
    password2
  } = formsValues;
  const handleRegister = (e) => {
    e.preventDefault();
    if (isForm()) {
      dispatch(registerWithEmailPasswordName(email, password, name))
    }
  };
  const isForm = () => {
    if (name.trim().length === 0) {
      dispatch(setErrorAction('Name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(setErrorAction('Email is required'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      dispatch(setErrorAction('Password should be at least 6 characters and match each other'));
      return false;
    }
    dispatch(setRemoveErrorAction());
    return true;
  };
  return (
    <div>
      <h1 className="auth__title">Register</h1>
      <form onSubmit={handleRegister}>
        {
          msgError &&
          (
            <div className="auth__alert-error">{msgError}</div>
          )
        }
        <input
          autoComplete="off"
          className="auth__input"
          name="name"
          onChange={handleInputChange}
          placeholder="Nombre"
          type="text"
          value={name}
        />
        <input
          autoComplete="off"
          className="auth__input"
          name="email"
          onChange={handleInputChange}
          placeholder="Email"
          type="email"
          value={email}
        />
        <input
          autoComplete="off"
          className="auth__input"
          name="password"
          onChange={handleInputChange}
          placeholder="Password"
          type="password"
          value={password}
        />
        <input
          autoComplete="off"
          className="auth__input"
          name="password2"
          onChange={handleInputChange}
          placeholder="Confirm"
          type="password"
          value={password2}
        />
        <button
          className="btn btn-primary btn-block mb-5"
          type="submit"
        >
          Login
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
