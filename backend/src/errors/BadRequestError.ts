import statusCodes from '../utils/statusCodes'

export default class BadRequestError extends Error {
  public status: number

  constructor(message: string) {
    super(message)
    this.status = statusCodes.badRequest
  }
}
