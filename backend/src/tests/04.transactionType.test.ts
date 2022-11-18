import * as sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import { app } from '../app'
import { Model } from 'sequelize'
import User from '../database/models/UserModel'
import { user } from './mocks/login.mocks'
import { cashInTransactionsList, cashOutTransactionsList, transactionsList } from './mocks/transaction.mock'

chai.use(chaiHttp)

const { expect } = chai

describe('04 - Transaction routes with type filter', () => {
  describe('GET /transaction/cashout - visualizar as transferências de cash-out', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashout')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token not found' })
      })
    })
    describe('quando o token não é valido', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').throws())
      afterEach(() => sinon.restore())

      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashout')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
    })
    describe('em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
        sinon.stub(Model, 'findAll').resolves(cashOutTransactionsList as any[])
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 200', async () => {
        const httpResponse = await chai
        .request(app)
        .get('/transaction/cashout')
        .set('Authorization', 'token')

        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(cashOutTransactionsList)
      })
    })
  })

  describe('GET /transaction/cashin - visualizar as transferências de cash-in', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashin')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token not found' })
      })
    })
    describe('quando o token não é valido', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').throws())
      afterEach(() => sinon.restore())

      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashin')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
    })
    describe('em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
        sinon.stub(Model, 'findAll').resolves(cashInTransactionsList as any[])
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 200', async () => {
        const httpResponse = await chai
        .request(app)
        .get('/transaction/cashin')
        .set('Authorization', 'token')

        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(cashInTransactionsList)
      })
    })
  })
})