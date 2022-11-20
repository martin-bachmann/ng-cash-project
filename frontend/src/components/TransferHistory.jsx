import React from 'react';
import TransferTable from './TransferTable';
import TransferTableFilters from './TransferTableFilters';

function TransferHistory() {
  return (
    <div>
      <h2>Histórico de transferências</h2>
      <TransferTableFilters />
      <TransferTable />
    </div>
  );
}

export default TransferHistory;
