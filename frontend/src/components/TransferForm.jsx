import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { postData } from '../services/requests';
import '../styles/components/TransferForm.css';

function TransferForm({ setLoading }) {
  const [username, setUsername] = useState('');
  const [transValue, setTransValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const performTransaction = async () => {
    try {
      await postData('/transaction', { username, value: transValue });
      setUsername('');
      setTransValue(0);
      setErrorMessage('');
      alert('Transação realizada com sucesso');
      setLoading(true);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form
      className="transfer-form-container"
      onSubmit={ (event) => {
        event.preventDefault();
        performTransaction();
      } }
    >
      <h1>Transferência</h1>
      <label htmlFor="username-input">
        <input
          type="text"
          value={ username }
          onChange={ ({ target: { value } }) => setUsername(value) }
          placeholder="Conta"
        />
      </label>
      <label htmlFor="value-input">
        <input
          type="number"
          value={ transValue }
          onChange={ ({ target: { value } }) => setTransValue(value) }
          placeholder="Valor"
        />
      </label>
      <p>{ errorMessage }</p>
      <button
        type="submit"
      >
        Realizar transferência
      </button>
    </form>
  );
}

TransferForm.propTypes = {
  setLoading: PropTypes.func.isRequired,
};

export default TransferForm;
