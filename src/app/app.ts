import 'dotenv/config';
import express, { Express } from 'express';
import { Routes } from './routes';

export class Application {
  private readonly app: Express;
  // private readonly dbContext = new DbContext(dbConfig);
  private readonly routes = new Routes();

  constructor() {
    this.app = express();
    this.initialize();
   }
  
  private initialize() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api',this.routes.initializeRoutes());
  }

  start({ port = process.env.PORT } = {}) {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      // this.dbContext.checkConnection().then(() => {
      //   console.log('Database connection successful');
      // }).catch((error) => {
      //   console.error('Database connection error:', error);
      // });
    });
  }
}
