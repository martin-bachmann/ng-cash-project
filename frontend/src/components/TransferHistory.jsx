import React, { useEffect, useState } from 'react';
import { getData } from '../services/requests';
import TransferTable from './TransferTable';
import TransferTableFilters from './TransferTableFilters';

function TransferHistory() {
  const [transactions, setTransactions] = useState([]);

  const queryTransferHistory = async (query) => {
    const getTransactions = await getData(`/transaction${query}`);
    setTransactions(getTransactions);
  };

  useEffect(() => {
    const getTransferHistory = async () => {
      const getTransactions = await getData('/transaction');
      setTransactions(getTransactions);
    };

    getTransferHistory()
      .catch();
  }, []);

  return (
    <div>
      <h2>Histórico de transferências</h2>
      <TransferTableFilters queryTransferHistory={ queryTransferHistory } />
      <TransferTable transactions={ transactions } />
    </div>
  );
}

export default TransferHistory;
