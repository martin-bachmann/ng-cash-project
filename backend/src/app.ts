// ./index.ts
import 'express-async-errors';
import express from 'express';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
  }

  private config():void {

    this.app.use(express.json());

    this.routes();
  }

  private routes(): void {
    // this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };