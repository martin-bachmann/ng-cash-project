import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'
import dateFilterMiddleware from '../middlewares/dateFilterMiddleware'
import transactionMiddleware from '../middlewares/transactionMiddleware'
import { validateJWT } from '../utils/JWT'

const router = Router()

const transactionController = new TransactionController()

router.post('/', validateJWT, transactionMiddleware, transactionController.performTransaction)

router.get('/', validateJWT, transactionController.getTransactions)

router.get('/search', validateJWT, dateFilterMiddleware, transactionController.getTransactionsWithDate)

router.get('/cashout', validateJWT, transactionController.getCashoutTransactions)

router.get('/cashout/search', validateJWT, dateFilterMiddleware, transactionController.getCashoutTransactionsWithDate)

router.get('/cashin', validateJWT, transactionController.getCashinTransactions)

router.get('/cashin/search', validateJWT, dateFilterMiddleware, transactionController.getCashinTransactionsWithDate)

export default router
