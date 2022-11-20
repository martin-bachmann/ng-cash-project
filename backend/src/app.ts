// ./index.ts
import 'express-async-errors'
import express from 'express'
import errorMiddleware from './middlewares/errorMiddleware'
import { accountRouter, loginRouter, transactionRouter } from './routes'

class App {
  public app: express.Express

  constructor() {
    this.app = express()

    this.config()
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    }
    
    this.app.use(express.json())
    this.app.use(accessControl)

    this.routes()
  }

  private routes(): void {
    this.app.use('/login', loginRouter)
    this.app.use('/account', accountRouter)
    this.app.use('/transaction', transactionRouter)
    this.app.use(errorMiddleware)
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`))
  }
}

export { App }

export const { app } = new App()
