import * as sinon from 'sinon'
import chai from 'chai'
import chaiHttp from 'chai-http'
import bcrypt from 'bcryptjs'
import { app } from '../app'
import { Model } from 'sequelize'
import database from '../database/models'
import User from '../database/models/UserModel'
import { user } from './mocks/login.mocks'

chai.use(chaiHttp)

const { expect } = chai

describe('01 - Login routes', () => {
  describe('POST /login - cadastrar novo usuário', () => {
    describe('quando o campo "username" não é informado', () => {
      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ password: '123456' })
        
        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" is required' })
      })
    })
    describe('quando o campo "password" não é informado', () => {
      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ username: 'usuario' })
        
        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"password" is required' })
      })
    })  
    describe('quando o campo "username" tem menos que 3 caracteres', () => {
      it('deve retornar um status 422', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ username: 'us', password: '123456' })
      
        expect(httpResponse.status).to.equal(422)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" length must be at least 3 characters long' })
      })
    })
    describe('quando o campo "username" tem um valor já utilizado', () => {
      beforeEach(() => sinon.stub(Model, 'findOne').resolves(user as User))
      afterEach(() => sinon.restore())

      it('deve retornar um status 403', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ username: 'usuario', password: '123456' })
      
        expect(httpResponse.status).to.equal(403)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" already exists' })
      })
    })
    describe('quando as credenciais estão corretas', () => {
      beforeEach(() => {
        sinon.stub(Model, 'findOne').resolves()
        sinon.stub(bcrypt, 'hash').resolves('password')
        sinon.stub(database, 'transaction').resolves({ commit(): void { } } as any)
        sinon.stub(Model, 'create').onFirstCall().resolves({ id: 1 } as any)
          .onSecondCall().resolves()
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 200', async () => {
        const httpResponse = await chai
          .request(app)
          .post('/login')
          .send({ username: 'usuario', password: '123456' })
      
          expect(httpResponse.status).to.equal(201)
          expect(httpResponse.body).to.deep.equal({ 'response': 'User created' })
      })
    })
  })

  describe('GET /login - fazer login', () => {
    describe('quando o campo "username" não é informado', () => {
      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/login')
          .send({ password: '123456' })
        
        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"username" is required' })
      })
    })
    describe('quando o campo "password" não é informado', () => {
      it('deve retornar um status 400', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/login')
          .send({ username: 'usuario' })
        
        expect(httpResponse.status).to.equal(400)
        expect(httpResponse.body).to.deep.equal({ 'message': '"password" is required' })
      })
    })  
    describe('quando o email informado não consta no banco de dados', () => {
      beforeEach(() => sinon.stub(Model, 'findOne').resolves(null))
      afterEach(() => sinon.restore())

      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/login')
          .send({ username: 'usuario', password: '123456' })
        
        expect(httpResponse.status).to.equal(401)
        expect(httpResponse.body).to.deep.equal({ 'message': 'Incorrect username or password' })
      })
    }) 
    describe('quando o email é encontrado mas a senha é incorreta', () => {
      beforeEach(() => {
        sinon.stub(Model, 'findOne').resolves(user as User)
        sinon.stub(bcrypt, 'compare').resolves(false)
      })
      afterEach(() => sinon.restore())
      
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/login')
          .send({ username: 'usuario', password: '123456' })
        
        expect(httpResponse.status).to.equal(401)
        expect(httpResponse.body).to.deep.equal({ 'message': 'Incorrect username or password' })
      })
    })
    describe('quando as credenciais estão corretas', () => {
      beforeEach(() => {
        sinon.stub(Model, 'findOne').resolves(user as User)
        sinon.stub(bcrypt, 'compare').resolves(true)
      })
      afterEach(() => sinon.restore())

      it('deve retornar um status 200', async () => {
        const httpResponse = await chai
          .request(app)
          .get('/login')
          .send({ username: 'usuario', password: '123456' })
        
        expect(httpResponse.status).to.equal(200)
        expect(httpResponse.body).to.have.key('token')
        expect(httpResponse.body.token).to.be.a('string')
      })
    })
  })
})