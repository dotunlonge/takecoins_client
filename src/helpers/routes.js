import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = props => {
  let { isAuthenticated } = props;
  return isAuthenticated !== false ? <Route {...props} /> : <Redirect to="/" />;
};

export const AuthRoute = props => {
  let { isAuthenticated } = props;
  return isAuthenticated ? <Redirect to="/dashboard" /> : <Route {...props} />;
};
