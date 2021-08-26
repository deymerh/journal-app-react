import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginWithEmailAndPassword, startGoogleLogin } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.ui);
  const [formsValues, handleInputChange] = useForm({
    email: '',
    password: ''
  });
  const { email, password } = formsValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWithEmailAndPassword(email, password));
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  }
  return (
    <div>
      <h1 className="auth__title">Login</h1>
      <form
        onSubmit={handleLogin}
        className="animate__animated animate__fadeIn animated__fater"
      >
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
          className="btn btn-primary btn-block"
          disabled={loading}
          data-testid="btnLogin"
        >
          Login
        </button>
        <hr />
        <div className="auth__social-netwoeks">
          <p>Login with social network</p>
          <div
            onClick={handleGoogleLogin}
            className="google-btn"
            data-testid="withGoogle"
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
    </div>
  );
};
