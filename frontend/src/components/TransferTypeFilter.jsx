import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

function TransferTypeFilter({ handleChange }) {
  return (
    <div>
      <Input
        name="type"
        id="todos"
        label=" Todos"
        labelFirst={ false }
        inputType="radio"
        value=""
        handleChange={ handleChange }
      />
      <Input
        name="type"
        id="cashout"
        label=" Cash-out"
        labelFirst={ false }
        inputType="radio"
        value="cashout"
        handleChange={ handleChange }
      />
      <Input
        name="type"
        id="cashin"
        label=" Cash-in"
        labelFirst={ false }
        inputType="radio"
        value="cashin"
        handleChange={ handleChange }
      />
    </div>
  );
}

TransferTypeFilter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default TransferTypeFilter;
