import statusCodes from '../utils/statusCodes'

export default class ForbiddenError extends Error {
  public status: number

  constructor(message: string) {
    super(message)
    this.status = statusCodes.forbidden
  }
}
