import React, { useState } from 'react';
import Input from './Input';

function TransferForm() {
  const [transferData, setTransferData] = useState({ username: '', value: 0 });

  const handleChange = ({ name, value }) => (
    setTransferData({ ...transferData, [name]: value })
  );

  const performTransaction = () => true;

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        performTransaction();
      } }
    >
      <Input
        inputType="text"
        name="username"
        value={ transferData.username }
        placeholder="Conta"
        handleChange={ handleChange }
      />
      <Input
        inputType="number"
        name="value"
        value={ transferData.value }
        placeholder="Valor"
        handleChange={ handleChange }
      />
      <button
        type="submit"
      >
        Realizar transferência
      </button>
    </form>
  );
}

export default TransferForm;
