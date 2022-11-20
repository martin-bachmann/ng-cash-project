import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserForm from '../components/UserForm';
import LoginContext from '../context/LoginContext';
import './Login.css';

function Login() {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const history = useHistory();
  const { loggedIn, login } = useContext(LoginContext);

  const handleChange = ({ name, value }) => (
    setLoginForm({ ...loginForm, [name]: value })
  );

  const loginFunc = () => {
    // conecta com a rota de login
    console.log(loggedIn);
    login();
    if (loggedIn) {
      history.push('/');
    }
  };

  return (
    <div className="login-container">
      <UserForm
        buttonText="Entrar"
        handleChange={ handleChange }
        handleSubmit={ loginFunc }
        value={ loginForm }
      />
      <p>
        Não tem uma conta?
        {' '}
        <Link to="/register">
          <span>Cadastre-se!</span>
        </Link>
      </p>
    </div>
  );
}

export default Login;
