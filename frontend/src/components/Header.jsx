import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

function Header() {
  const history = useHistory();
  const { loggedIn, login } = useContext(LoginContext);

  const logout = () => {
    console.log(loggedIn);
    login();
    if (!loggedIn) {
      history.push('/login');
    }
  };
  return (
    <header>
      <button type="button" onClick={ logout }>
        Logout
      </button>
      <div>
        <p className="info-text">
          {'Saldo atual: '}
          <span>GET BALANCE</span>
        </p>
        <h1>Implementar get username?</h1>
        <h2>LOGO</h2>
      </div>
    </header>
  );
}

export default Header;
