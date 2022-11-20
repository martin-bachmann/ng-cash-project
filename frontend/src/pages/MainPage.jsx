import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import TransferForm from '../components/TransferForm';
import TransferHistory from '../components/TransferHistory';
import { getData, setToken } from '../services/requests';

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
          <div>
            <header>
              <button type="button" onClick={ logout }>
                Logout
              </button>
              <div>
                <p className="info-text">
                  Saldo atual: R$
                  <span>{ balance }</span>
                </p>
                <h1>{ username }</h1>
                <h2>LOGO</h2>
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
