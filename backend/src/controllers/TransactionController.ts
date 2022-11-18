import { Request, Response } from 'express'
import statusCodes from '../statusCodes'
import TransactionService from '../services/TransactionService'

export default class TransactionController {
  constructor(private transactionService = new TransactionService()) { }

  performTransaction = async (req: Request, res: Response) => {
    const { user: { accountId, username: myUsername }, username, value } = req.body
    const response = await this.transactionService.performTransaction(myUsername, accountId, username, value)
    return res.status(statusCodes.created).json({ response })
  }

  getTransactions = async (req: Request, res: Response) => {
    const { accountId } = req.body.user
    const transactions = await this.transactionService.getTransactions(accountId)
    return res.status(statusCodes.ok).json(transactions)
  }
}
