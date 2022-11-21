import React from 'react';
import PropTypes from 'prop-types';

function TransferTable({ transactions }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Conta debitada</th>
          <th>Conta creditada</th>
          <th>Valor</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={ t.createdAt }>
            <td>{t.debitedAccountId}</td>
            <td>{t.creditedAccountId}</td>
            <td>{t.value}</td>
            <td>{t.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TransferTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    debitedAccountId: PropTypes.string,
    creditedAccountId: PropTypes.string,
    value: PropTypes.string,
    createdAt: PropTypes.string,
  })).isRequired,
};

export default TransferTable;
