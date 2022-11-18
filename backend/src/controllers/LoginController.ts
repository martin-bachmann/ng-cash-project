import { Request, Response } from 'express'
import statusCodes from '../statusCodes'
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
}
