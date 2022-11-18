import { NextFunction, Request, Response } from 'express'
import * as Joi from 'joi'
import BadRequestError from '../errors/BadRequestError'

const dateSchema = Joi.object({
  from: Joi.string().required().messages({
    'any.required': '"from" query is required',
  }),
  to: Joi.string().required().messages({
    'any.required': '"to" query is required',
  }),
})

const dateFilterMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const validation = dateSchema.validate(req.query)
  if (validation.error) {
    throw new BadRequestError(validation.error.details[0].message)
  }
  next()
}

export default dateFilterMiddleware