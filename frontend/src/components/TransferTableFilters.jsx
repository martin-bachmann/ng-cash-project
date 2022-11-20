import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

function TransferTableFilters({ queryTransferHistory }) {
  const [type, setType] = useState('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const filter = async () => {
    let query = `${type}/`;
    if (from || to) {
      query += 'search?';
      query += from ? `from=${from.toISOString().split('T')[0]}` : '';
      query += to ? `to=${to.toISOString().split('T')[0]}` : '';
    }
    await queryTransferHistory(query);
  };

  return (
    <form
      onSubmit={ (event) => {
        event.preventDefault();
        filter();
      } }
    >
      <div>
        <DatePicker onChange={ setFrom } name="from" value={ from } />
        <DatePicker onChange={ setTo } name="to" value={ to } />
      </div>
      <label htmlFor="all-input">
        <input
          type="radio"
          name="type"
          id="all-input"
          value=""
          onChange={ ({ target: { value } }) => setType(value) }
        />
        Todos
      </label>
      <label htmlFor="cashin-input">
        <input
          type="radio"
          name="type"
          id="cashin-input"
          value="/cashin"
          onChange={ ({ target: { value } }) => setType(value) }
        />
        Cash-in
      </label>
      <label htmlFor="cashout-input">
        <input
          type="radio"
          name="type"
          id="cashout-input"
          value="/cashout"
          onChange={ ({ target: { value } }) => setType(value) }
        />
        Cash-out
      </label>
      <button
        type="submit"
      >
        Filtrar
      </button>
    </form>
  );
}

TransferTableFilters.propTypes = {
  queryTransferHistory: PropTypes.func.isRequired,
};

export default TransferTableFilters;
