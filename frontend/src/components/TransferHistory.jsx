import React, { useEffect, useState } from 'react';
import { getData } from '../services/requests';
import TransferTable from './TransferTable';
import TransferTableFilters from './TransferTableFilters';
import '../styles/components/TransferHistory.css';

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
    <div className="transfer-history-container">
      <h1>Histórico de transferências</h1>
      <TransferTableFilters queryTransferHistory={ queryTransferHistory } />
      <TransferTable transactions={ transactions } />
    </div>
  );
}

export default TransferHistory;
