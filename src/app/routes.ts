import { Router } from 'express';
import { FloodArea } from './middlewares/flood-area';

export class Routes {
  public router: Router;
  private floodArea: FloodArea;

  constructor() {
    this.router = Router();
    this.floodArea = new FloodArea();
    this.initializeRoutes();
  }

  public initializeRoutes(): Router {
    this.router.get('/flood-area', this.floodArea.get);
    this.router.post('/flood-area', this.floodArea.send);
    this.router.put('/flood-area', this.floodArea.updated);
    this.router.delete('/flood-area', this.floodArea.delete);
    return this.router;
  }
}
