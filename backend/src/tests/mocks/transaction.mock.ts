export const creditedUser = { id: 2, username: 'usuarioCreditado', password: '123456', accountId: 2 }

export const accountWithoutBalance = { id: 1, balance: 0.00 }

export const transaction = {
  id: 1,
  debitedAccountId: 1,
  creditedAccountId: 2,
  value: 50.00,
  createdAt: Date.now(),
}