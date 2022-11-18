import { Request, Response } from 'express'
import statusCodes from '../utils/statusCodes'
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

  getTransactionsWithDate = async (req: Request, res: Response) => {
    const { from, to } = req.query
    const { accountId } = req.body.user
    const transactions = await this.transactionService.getTransactionsWithDate(accountId, String(from), String(to))
    return res.status(statusCodes.ok).json(transactions)
  }

  getCashoutTransactions = async (req: Request, res: Response) => {
    const { accountId } = req.body.user
    const transactions = await this.transactionService.getCashoutTransactions(accountId)
    return res.status(statusCodes.ok).json(transactions)
  }

  getCashoutTransactionsWithDate = async (req: Request, res: Response) => {
    const { from, to } = req.query
    const { accountId } = req.body.user
    const transactions = await this.transactionService.getCashoutTransactionsWithDate(accountId, String(from), String(to))
    return res.status(statusCodes.ok).json(transactions)
  }

  getCashinTransactions = async (req: Request, res: Response) => {
    const { accountId } = req.body.user
    const transactions = await this.transactionService.getCashinTransactions(accountId)
    return res.status(statusCodes.ok).json(transactions)
  }

  getCashinTransactionsWithDate = async (req: Request, res: Response) => {
    const { from, to } = req.query
    const { accountId } = req.body.user
    const transactions = await this.transactionService.getCashinTransactionsWithDate(accountId, String(from), String(to))
    return res.status(statusCodes.ok).json(transactions)
  }
}
