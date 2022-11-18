import { Router } from 'express'
import TransactionController from '../controllers/TransactionController'
import transactionMiddleware from '../middlewares/transactionMiddleware'
import { validateJWT } from '../utils/JWT'

const router = Router()

const transactionController = new TransactionController()

router.post('/', validateJWT, transactionMiddleware, transactionController.performTransaction)

export default router
