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

describe('05 - Transaction routes with date queries', () => {
  describe('GET /transaction/search - visualizar as transferências com as queries de data', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/search?from=2022-11-18&to=2022-11-18')

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
          .get('/transaction/search?from=2022-11-18&to=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
    })
    describe('quando a query "from" não é informada', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/search?to=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"from" query is required' })
      })
    })
    describe('quando a query "to" não é informada', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/search?from=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"to" query is required' })
      })
    })
    describe('quando uma das queries não tem o formato YYYY-MM-DD', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/search?from=2022-11-18&to=20/11/18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"from" and "to" queries must match YYYY-MM-DD' })
      })
    })
    describe('em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
        sinon.stub(Model, 'findAll').resolves(transactionsList as any[])
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 200', async () => {
        const httpResponse = await chai
        .request(app)
        .get('/transaction/search?from=2022-11-18&to=2022-11-18')
        .set('Authorization', 'token')

        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(transactionsList)
      })
    })
  })

  describe('GET /transaction/cashout/search - visualizar as transferências de cash-out com as queries de data', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashout/search?from=2022-11-18&to=2022-11-18')

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
          .get('/transaction/cashout/search?from=2022-11-18&to=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
    })
    describe('quando a query "from" não é informada', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashout/search?to=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"from" query is required' })
      })
    })
    describe('quando a query "to" não é informada', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashout/search?from=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"to" query is required' })
      })
    })
    describe('quando uma das queries não tem o formato YYYY-MM-DD', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashout/search?from=2022-11-18&to=20/11/18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"from" and "to" queries must match YYYY-MM-DD' })
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
        .get('/transaction/cashout/search?from=2022-11-18&to=2022-11-18')
        .set('Authorization', 'token')

        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(cashOutTransactionsList)
      })
    })
  })

  describe('GET /transaction/cashin/search - visualizar as transferências de cash-in com as queries de data', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashin/search?from=2022-11-18&to=2022-11-18')

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
          .get('/transaction/cashin/search?from=2022-11-18&to=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
    })
    describe('quando a query "from" não é informada', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashin/search?to=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"from" query is required' })
      })
    })
    describe('quando a query "to" não é informada', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashin/search?from=2022-11-18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"to" query is required' })
      })
    })
    describe('quando uma das queries não tem o formato YYYY-MM-DD', () => {
      beforeEach(() => sinon.stub(jwt, 'verify').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction/cashin/search?from=2022-11-18&to=20/11/18')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(400)
          expect(httpResponse.body).to.deep.equal({ message: '"from" and "to" queries must match YYYY-MM-DD' })
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
        .get('/transaction/cashin/search?from=2022-11-18&to=2022-11-18')
        .set('Authorization', 'token')

        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(cashInTransactionsList)
      })
    })
  })
})