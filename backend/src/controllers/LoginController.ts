import { Request, Response } from 'express'
import statusCodes from '../utils/statusCodes'
import LoginService from '../services/LoginService'

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const response = await this.loginService.registerUser(username, password)
    return res.status(statusCodes.created).json({ response })
  }

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const token = await this.loginService.login(username, password)
    return res.status(statusCodes.ok).json({ token })
  }

  validateLogin = async (req: Request, res: Response) => {
    const { username } = req.body.user
    await this.loginService.validateLogin(username)
    return res.status(statusCodes.ok).json(username)
  }
}
