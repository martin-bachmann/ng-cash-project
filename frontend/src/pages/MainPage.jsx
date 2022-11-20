import React from 'react';
import Header from '../components/Header';
import TransferForm from '../components/TransferForm';
import TransferHistory from '../components/TransferHistory';

function MainPage() {
  return (
    <div>
      <Header />
      <main>
        <TransferForm />
        <TransferHistory />
      </main>
    </div>
  );
}

export default MainPage;
