import { Router } from 'express'
import AccountController from '../controllers/AccountController'
import { validateJWT } from '../utils/JWT'

const router = Router()

const accountController = new AccountController()

router.get('/', validateJWT, accountController.getBalance)

export default router
