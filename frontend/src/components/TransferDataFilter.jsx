import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-date-picker';

function TransferDataFilter({ handleFrom, handleTo, from, to }) {
  return (
    <div>
      <DatePicker onChange={ handleFrom } name="from" value={ from } />
      <DatePicker onChange={ handleTo } name="to" value={ to } />
    </div>
  );
}

TransferDataFilter.propTypes = {
  handleFrom: PropTypes.func,
  handleTo: PropTypes.func,
  from: PropTypes.instanceOf(Date),
  to: PropTypes.instanceOf(Date),
}.isRequired;

export default TransferDataFilter;
