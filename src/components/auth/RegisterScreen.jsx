import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { setErrorAction, setRemoveErrorAction } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [formsValues, handleInputChange] = useForm({
    name: 'Deymer',
    email: 'deymerh@hotmail.com',
    password: 'axn5s1m8',
    password2: 'axn5s1m8',
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
      console.log('Form true!');
    } else {
      console.log('Form false');
      dispatch(setErrorAction(error));
    }
  };
  const isForm = () => {
    if (name.trim().length === 0) {
      setError('Name is required');
      return false;
    } else if (!validator.isEmail(email)) {
      setError('Email is required');
      return false;
    } else if (password !== password2 || password.length < 5) {
      setError('Password should be at least 6 characters and match each other');
      return false;
    }
    dispatch(setRemoveErrorAction());
    return true;
  };
  return (
    <>
      <h1 className="auth__title">Register</h1>
      <form onSubmit={handleRegister}>
        {
          !isForm && <div className="auth__alert-error">Hola Mundo</div>
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
          type="text"
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
    </>
  );
};
