import { Router } from 'express';
import { listFloodAreaController } from '../infra/controllers/flood-area/list-flood-area-controller';
import { listFaqController } from './controllers/faq/list-faq-controller';
import { getFaqByIdController } from './controllers/faq/get-faq-by-id-controller';
import { createFaqController } from './controllers/faq/create-faq-controller';
import { updateFaqController } from './controllers/faq/update-faq-controller';
import { deleteFaqController } from './controllers/faq/delete-faq-controller';
import { createNotificationController } from './controllers/notification/create-notification-controller';
import { getNotificationByIdController } from './controllers/notification/get-notification-by-id-controller';
import { updateNotificationController } from './controllers/notification/update-notification-controller';
import { deleteNotificationController } from './controllers/notification/delete-notification-controller';
import { listNotificationController } from './controllers/notification/list-notification-controller';
import { createFloodAreaController } from './controllers/flood-area/create-flood-area-controller';
import { getFloodAreaByIdController } from './controllers/flood-area/get-flood-area-by-id-controller';
import { updateFloodAreaController } from './controllers/flood-area/update-flood-area-controller';
import { deleteFloodAreaController } from './controllers/flood-area/delete-food-area-controller';
import { createSessionUserAdminController } from './controllers/auth/auth-user-admin/create-session-user-admin-controller';
import { createUserAdminController } from './controllers/user-admin/create-user-admin-controller';

export class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  public initializeRoutes(): Router {
    this.router.get('/flood-area', listFloodAreaController.handle);
    this.router.get('/flood-area/:id', getFloodAreaByIdController.handle);
    this.router.post('/flood-area', createFloodAreaController.handle);
    this.router.put('/flood-area/:id', updateFloodAreaController.handle);
    this.router.delete('/flood-area/:id', deleteFloodAreaController.handle);

    this.router.get('/faq', listFaqController.handle);
    this.router.get('/faq/:id', getFaqByIdController.handle);
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

    // this.router.post('/code', createCodeController.handle);
    // this.router.put('/code/:id', updateCodeController.handle);
    // this.router.get('/code/:id', getCodeByIdController.handle);

    this.router.post(
      '/auth-user-admin',
      createSessionUserAdminController.handle
    );

    this.router.post('/user-admin', createUserAdminController.handle);

    return this.router;
  }
}
