import React from 'react';
import PropTypes from 'prop-types';

function Input({ isLabelBefore, labelTestid, testid, label, checked,
  inputType, name, value, placeholder, handleChange, nameClass }) {
  return (
    <label data-testid={ labelTestid } htmlFor={ testid } className={ nameClass }>
      { isLabelBefore && label}
      <input
        type={ inputType }
        data-testid={ testid }
        id={ testid }
        checked={ checked }
        name={ name }
        value={ value }
        placeholder={ placeholder }
        onChange={ ({ target }) => handleChange(target) }
      />
      { !isLabelBefore && label}
    </label>
  );
}

Input.propTypes = {
  isLabelBefore: PropTypes.bool,
  labelTestid: PropTypes.string,
  testid: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  nameClass: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  isLabelBefore: true,
  name: null,
  labelTestid: null,
  testid: null,
  label: null,
  placeholder: null,
  checked: null,
  nameClass: null,
};

export default Input;
