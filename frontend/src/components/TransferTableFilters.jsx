import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

function TransferTableFilters({ queryTransferHistory }) {
  const [type, setType] = useState('');
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const filter = async () => {
    try {
      let query = `${type}/`;
      if (from || to) {
        query += 'search?';
        query += from ? `from=${from.toISOString().split('T')[0]}` : '';
        query += (from && to) ? '&' : '';
        query += to ? `to=${to.toISOString().split('T')[0]}` : '';
      }
      await queryTransferHistory(query);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="transfer-filters-container">
      <form
        className="transfer-filters"
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
          className="transfer-filters-button"
          type="submit"
        >
          Filtrar
        </button>
      </form>
      <p>{ errorMessage }</p>
    </div>

  );
}

TransferTableFilters.propTypes = {
  queryTransferHistory: PropTypes.func.isRequired,
};

export default TransferTableFilters;
