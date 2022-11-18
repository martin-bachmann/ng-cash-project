import Account from '../database/models/AccountModel'
import UnauthorizedError from '../errors/UnauthorizedError'

export default class AccountService {
  getBalance = async(id: number): Promise<number> => {
    const account = await Account.findByPk(id)
    if (!account) {
      throw new UnauthorizedError('Token must be a valid token')
    }
    const { balance } = account
    return balance
  }
}
