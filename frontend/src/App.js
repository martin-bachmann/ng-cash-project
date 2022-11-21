import React from 'react';
import LoginProvider from './context/LoginProvider';
import Routes from './Routes';

function App() {
  return (
    <LoginProvider>
      <Routes />
    </LoginProvider>
  );
}

export default App;
