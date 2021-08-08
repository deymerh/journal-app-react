import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PublicteRoute = ({
  isAuthenticated,
  component:Component,
  ...rest
}) => {
  return (
    <Route { ...rest }
      component={(props)=>(
        (isAuthenticated)
        ? (<Redirect to="/" />)
        : (<Component { ...props}/>)
      )}
    />
  );
};