import 'dotenv/config';
import express, { Express } from 'express';
import { Routes } from './routes';

export class Server {
  private readonly app: Express;
  private readonly routes = new Routes();

  constructor() {
    this.app = express();
    this.initialize();
  }

  private initialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api', this.routes.initializeRoutes());
  }

  start({ port = process.env.PORT || 3331 } = {}) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}
