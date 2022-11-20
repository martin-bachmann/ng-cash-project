import React, { useState } from 'react';
import TransferDataFilter from './TransferDataFilter';
import TransferTypeFilter from './TransferTypeFilter';

function TransferTableFilters() {
  const [type, setType] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filter = () => ({ type, from, to });

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        filter();
      } }
    >
      <TransferDataFilter
        handleFrom={ setFrom }
        handleTo={ setTo }
        from={ from }
        to={ to }
      />
      <TransferTypeFilter handleChange={ setType } />
      <button
        type="submit"
      >
        Filtrar
      </button>
    </form>
  );
}

export default TransferTableFilters;
