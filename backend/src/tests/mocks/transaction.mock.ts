export const creditedUser = { id: 2, username: 'usuarioCreditado', password: '123456', accountId: 2 }

export const accountWithoutBalance = { id: 1, balance: 0.00 }

export const transaction = {
  id: 1,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: 50.00,
  createdAt: Date.now(),
}

export const transactionsList = [
  {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 50.00,
    createdAt: Date.now(),
  },
  {
    id: 2,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: 50.00,
    createdAt: Date.now(),
  },
  {
    id: 3,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 50.00,
    createdAt: Date.now(),
  },
  {
    id: 4,
    debitedAccountId: 2,
    creditedAccountId: 1,
    value: 50.00,
    createdAt: Date.now(),
  }
]