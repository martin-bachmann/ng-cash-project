import { Op } from 'sequelize'
import database from '../database/models'
import Account from '../database/models/AccountModel'
import Transaction from '../database/models/TransactionModel'
import User from '../database/models/UserModel'
import BadRequestError from '../errors/BadRequestError'
import InternalServerError from '../errors/InternalServerError'
import NotFoundError from '../errors/NotFoundError'

export default class TransactionService {
  performTransaction = async(myUsername: string, myAccountId: number, username: string, value: number): Promise<string> => {
    if (myUsername === username) {
      throw new BadRequestError('"username" must be of another user')
    }

    if (value <= 0) {
      throw new BadRequestError('"value" must be greater than 0')
    }

    const creditedUser = await User.findOne({ where: { username } })
    if (!creditedUser) {
      throw new NotFoundError('"username" not found')
    }

    const myAccount = await Account.findByPk(myAccountId)
    if (myAccount && myAccount.balance < value) {
      throw new BadRequestError('Insuficient balance')
    }

    const t = await database.transaction()
    try {
      await Account.increment({ balance: value }, { where: { id: creditedUser.accountId }, transaction: t })
      await Account.increment({ balance: -value }, { where: { id: myAccountId }, transaction: t })
      await Transaction.create(
        { debitedAccountId: myAccountId, creditedAccountId: creditedUser.accountId, value, createdAt: Date.now() }, 
        { transaction: t }
      )
    } catch (e) {
      await t.rollback()
      throw new InternalServerError('database error')
    }
    await t.commit()

    return 'Transaction done'
  }

  getTransactions = async(accountId: number): Promise<Transaction[]> => {
    const transactionsList = await Transaction.findAll({ where: { [Op.or]: [{ debitedAccountId: accountId }, { creditedAccountId: accountId }] } })
    return transactionsList
  }
}
