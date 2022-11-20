import { Request, Response } from 'express'
import statusCodes from '../utils/statusCodes'
import AccountService from '../services/AccountService'

export default class AccountController {
  constructor(private accountService = new AccountService()) { }

  getBalance = async (req: Request, res: Response) => {
    const { accountId } = req.body.user
    const balance = await this.accountService.getBalance(accountId)
    return res.status(statusCodes.ok).json(balance)
  }
}
