import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postData, setToken } from '../services/requests';
import '../styles/pages/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const loginFunc = async () => {
    try {
      const { token } = await postData('/login', { username, password });

      setToken(token);
      setErrorMessage('');
      localStorage.setItem('token', token);

      history.push('/main');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h1>Fazer login</h1>
        <form
          className="login-form-container"
          onSubmit={ (event) => {
            event.preventDefault();
            loginFunc();
          } }
        >
          <label htmlFor="username-input">
            <input
              type="text"
              value={ username }
              onChange={ ({ target: { value } }) => setUsername(value) }
              placeholder="Username"
            />
          </label>
          <label htmlFor="password-input">
            <input
              type="password"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
              placeholder="Senha"
            />
          </label>
          <p>{ errorMessage }</p>
          <button
            type="submit"
          >
            Entrar
          </button>
        </form>
        <p>
          Não tem uma conta?
          {' '}
          <Link to="/register">
            <span>Cadastre-se!</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
