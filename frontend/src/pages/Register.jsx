import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postData } from '../services/requests';
import '../styles/pages/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const register = async () => {
    try {
      await postData('/login/register', { username, password });
      setErrorMessage('');
      history.push('/login');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <h1>Registre sua conta</h1>
        <form
          className="register-form-container"
          onSubmit={ (event) => {
            event.preventDefault();
            register();
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
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
