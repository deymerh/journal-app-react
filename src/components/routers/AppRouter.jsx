import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import { PrivateRoute } from './PrivateRoutes';
import { PublicteRoute } from './PublicRoutes';

import { useDispatch } from 'react-redux';
import { firebase } from '../../firebase/firebase-config';

import { AuthRouter } from './AuthRouter';
import { login } from '../../actions/auth';
import { JournalScreen } from '../journal/JournalScreen';

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      }
      setChecking(false);
    })
  }, [dispatch, setChecking, setIsLoggedIn]);
  console.log(isLoggedIn);
  if (checking) {
    return(
      <h1>Espere...</h1>
    )
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicteRoute isAuthenticated={isLoggedIn} path="/auth" component={AuthRouter} />
          <PrivateRoute exact isAuthenticated={isLoggedIn} path="/" component={JournalScreen} />
          <Redirect to="auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
