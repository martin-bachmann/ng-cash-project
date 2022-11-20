import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginContext from './context/LoginContext';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

function Routes() {
  const loggedIn = useContext(LoginContext);
  return (
    <Switch>
      <Route exact path="/">
        { loggedIn ? <MainPage /> : <Redirect to="/login" /> }
      </Route>
      {' '}
      <Route exact path="/login" component={ Login } />
      <Route exact path="/register" component={ Register } />
      <Route path="*" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
