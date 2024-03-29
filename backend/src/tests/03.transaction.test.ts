import * as sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import jwt from 'jsonwebtoken'
import { app } from '../app'
import { Model } from 'sequelize'
import database from '../database/models'
import Account from '../database/models/AccountModel'
import User from '../database/models/UserModel'
import { account } from './mocks/account.mock'
import { user } from './mocks/login.mocks'
import { accountWithoutBalance, creditedUser, transaction, transactionsList } from './mocks/transaction.mock'

chai.use(chaiHttp)

const { expect } = chai

describe('03 - Transaction routes', () => {
  describe('POST /transaction - realizar uma transferência', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/transaction')

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
          .post('/transaction')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
      })
    })
    describe('quando o username não é informado', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ value: 50.00 })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" is required' })
      })
    })
    describe('quando o valor não é informado', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ username: 'usuarioCreditado' })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"value" is required' })
      })
    })
    describe('quando o username é igual o do usuário', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ username: 'usuario', value: 50.00 })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" must be of another user' })
      })
    })
    describe('quando o value é igual ou menor que 0', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ username: 'usuarioCreditado', value: -50.00 })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"value" must be greater than 0' })
      })
    })
    describe('quando o username não consta no banco de dados', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
        sinon.stub(Model, 'findOne').resolves(null)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ username: 'usuarioCreditado', value: 50.00 })

        expect(httpResponse.status).to.equal(404)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" not found' })
      })
    })
    describe('quando o balance não é suficiente para a transação', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
        sinon.stub(Model, 'findOne').resolves(creditedUser as User)
        sinon.stub(Model, 'findByPk').resolves(accountWithoutBalance as Account)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ username: 'usuarioCreditado', value: 50.00 })

        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': 'Insuficient balance' })
      })
    })
    describe('em caso de sucesso', () => {
      beforeEach(() => {
        sinon.stub(jwt, 'verify').resolves(user as User)
        sinon.stub(Model, 'findOne').resolves(creditedUser as User)
        sinon.stub(Model, 'findByPk').resolves(account as Account)
        sinon.stub(database, 'transaction').resolves({ commit(): void { } } as any)
        sinon.stub(Model, 'increment').onFirstCall().resolves()
          .onSecondCall().resolves()
        sinon.stub(Model, 'create').resolves(transaction as any)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 201', async () => {
        const httpResponse = await chai
        .request(app)
        .post('/transaction')
        .set('Authorization', 'token')
        .send({ username: 'usuarioCreditado', value: 50.00 })

        expect(httpResponse.status).to.equal(201)
        expect(httpResponse.body).to.deep.equal({ response: 'Transaction done'})
      })
    })
  })

  describe('GET /transaction - visualizar todas as transferências', () => {
    describe('quando o token não é informado', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/transaction')

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
          .get('/transaction')
          .set('Authorization', 'token')

          expect(httpResponse.status).to.equal(401)
          expect(httpResponse.body).to.deep.equal({ message: 'Token must be a valid token' })
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
        .get('/transaction')
        .set('Authorization', 'token')

        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.deep.equal(transactionsList)
      })
    })
  })
})