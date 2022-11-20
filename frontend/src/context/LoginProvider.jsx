import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [token, setToken] = useState(null);

  function login() {
    setLoggedIn(loggedIn !== true);
  }

  return (
    <LoginContext.Provider value={ { loggedIn, login } }>
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
