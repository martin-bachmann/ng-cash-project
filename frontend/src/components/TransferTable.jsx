import React from 'react';
import PropTypes from 'prop-types';

function TransferTable({ transactions }) {
  const transformDate = (date) => {
    const hourCorrection = 216000;
    const correctDate = new Date(Date.parse(date) - hourCorrection);
    return correctDate.toLocaleString('en-GB');
  };

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
            <td>{t.debitedAccount.account.username}</td>
            <td>{t.creditedAccount.account.username}</td>
            <td>{`R$ ${t.value}`}</td>
            <td>{transformDate(t.createdAt)}</td>
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
