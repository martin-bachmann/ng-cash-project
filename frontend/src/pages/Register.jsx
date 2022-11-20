import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { postData } from '../services/requests';

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
    <div className="login-container">
      <form
        className="login-form-container"
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
  );
}

export default Register;
