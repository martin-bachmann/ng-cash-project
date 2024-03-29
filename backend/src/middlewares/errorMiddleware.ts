import { ErrorRequestHandler } from 'express'
import statusCodes from '../utils/statusCodes'

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message })
  }

  return res.status(statusCodes.internalServerError).json({ message: 'Internal server error' })
}

export default errorMiddleware