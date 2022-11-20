import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      {' '}
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route exact path="/main" component={ MainPage } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
