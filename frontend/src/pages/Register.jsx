import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserForm from '../components/UserForm';

function Register() {
  const [registerForm, setRegisterForm] = useState({ username: '', password: '' });
  const history = useHistory();
  const handleChange = ({ name, value }) => (
    setRegisterForm({ ...registerForm, [name]: value })
  );

  const register = () => {
    // registrar cadastro
    history.push('/login');
  };

  return (
    <div className="login-container">
      <UserForm
        buttonText="Cadastrar"
        handleChange={ handleChange }
        handleSubmit={ register }
        value={ registerForm }
      />
    </div>
  );
}

export default Register;
