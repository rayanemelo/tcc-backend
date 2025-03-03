import { Router } from 'express';
import { listFloodAreaController } from '../infra/controllers/flood-area/list-flood-area-controller';
import { listFaqController } from './controllers/faq/list-faq-controller';
import { getByIdFaqController } from './controllers/faq/get-faq-by-id-controller';
import { createFaqController } from './controllers/faq/create-faq-controller';
import { updateFaqController } from './controllers/faq/update-faq-controller';
import { deleteFaqController } from './controllers/faq/delete-faq-controller';
import { createNotificationController } from './controllers/notification/create-notification-controller';
import { getNotificationByIdController } from './controllers/notification/get-notification-by-id-controller';
import { updateNotificationController } from './controllers/notification/update-notification-controller';
import { deleteNotificationController } from './controllers/notification/delete-notification-controller';
import { listNotificationController } from './controllers/notification/list-notification-controller';

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

    this.router.get('/faq', listFaqController.handle);
    this.router.get('/faq/:id', getByIdFaqController.handle);
    this.router.post('/faq', createFaqController.handle);
    this.router.put('/faq/:id', updateFaqController.handle);
    this.router.delete('/faq/:id', deleteFaqController.handle);

    this.router.get('/notification', listNotificationController.handle);
    this.router.get('/notification/:id', getNotificationByIdController.handle);
    this.router.post('/notification', createNotificationController.handle);
    this.router.put('/notification/:id', updateNotificationController.handle);
    this.router.delete(
      '/notification/:id',
      deleteNotificationController.handle
    );

    return this.router;
  }
}
