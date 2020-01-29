import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../components/home';
// list of working routes for frontend app
export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    requiredAuth: false,
    requiredHeader: false,
  }
];

export const Auth = {
  isAuthenticated: window.localStorage.getItem('token') ? true : false,
  authenticate() {
    this.isAuthenticated = true;
  },
};

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        Auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}