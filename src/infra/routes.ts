import { Router } from 'express';
import { listFloodAreaController } from '../infra/controllers/flood-area/list-flood-area-controller';

export class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  public initializeRoutes(): Router {
    this.router.get('/flood-area', listFloodAreaController.handle);
    // this.router.post('/flood-area', this.floodArea.send);
    // this.router.put('/flood-area', this.floodArea.updated);
    // this.router.delete('/flood-area', this.floodArea.delete);
    return this.router;
  }
}
