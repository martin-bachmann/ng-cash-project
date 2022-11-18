import { NextFunction, Request, Response } from 'express'
import * as Joi from 'joi'
import BadRequestError from '../errors/BadRequestError'

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': '"username" is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': '"password" is required',
  }),
})

const loginMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const validation = loginSchema.validate(req.body)
  if (validation.error) {
    throw new BadRequestError(validation.error.details[0].message)
  }
  next()
}

export default loginMiddleware