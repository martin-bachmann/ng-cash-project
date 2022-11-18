import { compare, hash } from 'bcryptjs'
import { generateToken } from '../utils/JWT'
import UnauthorizedError from '../errors/UnauthorizedError'
import User from '../database/models/UserModel'
import UnprocEntityError from '../errors/UnprocEntityError'
import BadRequestError from '../errors/BadRequestError'
import Account from '../database/models/AccountModel'
import database from '../database/models'
import ForbiddenError from '../errors/ForbiddenError'

export default class LoginService {
  registerUser = async (username: string, password: string): Promise<string> => {
    if (username.length < 3) {
      throw new UnprocEntityError('"username" length must be at least 3 characters long')
    }

    const user = await User.findOne({ where: { username } })
    if (user) {
      throw new ForbiddenError('"username" already exists')
    }

    const cryptedPassword = await hash(password, 10)

    const t = await database.transaction()
    try {
      const { id } = await Account.create({ balance: 100 }, { transaction: t})
      await User.create({ username, password: cryptedPassword, accountId: id }, { transaction: t})
    } catch (e) {
      await t.rollback()
      throw new BadRequestError('database error')
    }
    await t.commit()

    return 'User created'
  }

  login = async (username: string, password: string): Promise<string> => {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      throw new UnauthorizedError('Incorrect username or password')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedError('Incorrect username or password')
    }

    const { id } = user
    const token = generateToken(id, username)
    return token
  }
}
