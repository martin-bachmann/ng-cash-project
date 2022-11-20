import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

function UserForm({ handleChange, handleSubmit, buttonText, value }) {
  return (
    <form
      className="login-form-container"
      onSubmit={ (event) => {
        event.preventDefault();
        handleSubmit();
      } }
    >
      <Input
        inputType="text"
        name="username"
        value={ value.username }
        placeholder="Username"
        handleChange={ handleChange }
      />
      <Input
        inputType="password"
        name="password"
        value={ value.password }
        placeholder="Password"
        handleChange={ handleChange }
      />
      <button
        type="submit"
      >
        { buttonText }
      </button>
    </form>
  );
}

UserForm.propTypes = {
  buttonText: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  value: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};

export default UserForm;
