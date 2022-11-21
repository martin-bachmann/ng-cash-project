import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TransferForm from '../components/TransferForm';
import TransferHistory from '../components/TransferHistory';
import { getData, setToken } from '../services/requests';
import '../styles/pages/MainPage.css';

function MainPage() {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const logout = () => {
    setToken('');
    localStorage.setItem('token', '');
    history.push('/login');
  };

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token') || '';

      if (token !== '') {
        setToken(token);
      }

      const getUsername = await getData('/login/validate');

      if (getUsername) setUsername(getUsername);

      const getBalance = await getData('/account');
      setBalance(getBalance);
      setLoading(false);
    };

    getUser()
      .catch();
  }, [loading]);

  return (
    <div>
      {
        loading ? <p>Loading</p> : (
          <div className="main-background">
            <header className="main-header">
              <button type="button" onClick={ logout }>
                Logout
              </button>
              <div className="main-header-nav">
                <div className="balance">
                  <p>Saldo atual:</p>
                  <p>{ `R$ ${balance}` }</p>
                </div>
                <h1>{ username }</h1>
                <img
                  src="logo-ngcash-branco.88c5860.svg"
                  alt="NG Cash logo"
                  className="logo"
                />
              </div>
            </header>
            <main>
              <TransferForm setLoading={ setLoading } />
              <TransferHistory />
            </main>
          </div>
        )
      }
    </div>
  );
}

export default MainPage;
