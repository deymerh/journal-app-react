import React from 'react';
import { Link } from 'react-router-dom';

export const LoginScreen = () => {
  return (
    <>
      <h1 className="auth__title">Login</h1>
      <form>
        <input autoComplete="off" className="auth__input" type="text" placeholder="Email" name="email" />
        <input autoComplete="off" className="auth__input" type="password" placeholder="Password" name="password" />
        <button type="submit" className="btn btn-primary btn-block">Login</button>
        <hr />
        <div className="auth__social-netwoeks">
          <p>Login with social network</p>
          <div className="google-btn">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className="link" to="/auth/register">Create new account</Link>
      </form>
    </>
  );
};
