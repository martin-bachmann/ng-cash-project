import React from 'react';

function Header() {
  const logout = () => true;
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
