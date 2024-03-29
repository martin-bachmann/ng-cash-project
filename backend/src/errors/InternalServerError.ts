import statusCodes from '../utils/statusCodes'

export default class InternalServerError extends Error {
  public status: number

  constructor(message: string) {
    super(message)
    this.status = statusCodes.internalServerError
  }
}
