import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
  return (
    <>
      <h1 className="auth__title">Register</h1>
      <form>
        <input autoComplete="off" className="auth__input" type="text" placeholder="Nombre" name="nombre" />
        <input autoComplete="off" className="auth__input" type="text" placeholder="Email" name="email" />
        <input autoComplete="off" className="auth__input" type="password" placeholder="Password" name="password" />
        <input autoComplete="off" className="auth__input" type="password" placeholder="Confirm" name="password2" />
        <button type="submit" className="btn btn-primary btn-block mb-5">Login</button>
        <Link className="link" to="/auth/login">Already registered?</Link>
      </form>
    </>
  );
};
