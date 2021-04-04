import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginWithEmailAndPassword, startGoogleLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formsValues, handleInputChange] = useForm({
    email: 'deymerh@hotmail.com',
    password: 'axn5s1m8'
  });
  const { email, password } = formsValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAndPassword(email, password));
    console.log(email, password);
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }
  return (
    <>
      <h1 className="auth__title">Login</h1>
      <form onSubmit={handleLogin}>
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
        <button
          type="submit"
          className="btn btn-primary btn-block">
          Login
          </button>
        <hr />
        <div className="auth__social-netwoeks">
          <p>Login with social network</p>
          <div
            onClick={handleGoogleLogin}
            className="google-btn"
          >
            <div className="google-icon-wrapper">
              <img
                className="google-icon"
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="google button"
              />
            </div>
            <p className="btn-text">
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link
          className="link"
          to="/auth/register"
        >
          Create new account
          </Link>
      </form>
    </>
  );
};
