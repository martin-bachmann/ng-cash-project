import * as sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import { app } from '../app'
import { Model } from 'sequelize'
import User from '../database/models/UserModel'
import Account from '../database/models/AccountModel'
import { user } from './mocks/login.mocks'
import { account } from './mocks/account.mock'

chai.use(chaiHttp)

const { expect } = chai

describe('GET /account - visualizar o balance atual', () => {
  describe('quando o token não é informado', () => {
    afterEach(() => sinon.restore())

    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/account')

      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Token not found' })
    })
  })
  describe('quando o token não é valido', () => {
    beforeEach(() => sinon.stub(jwt, 'verify').resolves(null))
    afterEach(() => sinon.restore())

    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/account')
        .set('Authorization', 'token')

      expect(httpResponse.status).to.equal(401)
      expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
    })
  })
  describe('em caso de sucesso', () => {
    beforeEach(() => {
      sinon.stub(jwt, 'verify').resolves(user as User)
      sinon.stub(Model, 'findOne').resolves(account as Account)
    })
    afterEach(() => sinon.restore())

    it('deve retornar um status 201', async () => {
      const httpResponse = await chai
      .request(app)
      .post('/account')
      .set('Authorization', 'token')

      expect(httpResponse.status).to.equal(200)
      expect(httpResponse.body).to.deep.equal({ balance: 100.00 })
    })
  })
})