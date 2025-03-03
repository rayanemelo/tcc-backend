import { Request, Response } from 'express';
import { UpdateNotificationUseCase } from '../../../app/use-cases/notification/update-notification-use-case';

import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { paramIdSchema } from '../../types/param-id-schema';
import { NotificationRepositoryPrisma } from '../../repositories/notification/notification-repository-prisma';

class UpdateNotificationController {
  private updateNotificationUseCase: UpdateNotificationUseCase;

  constructor() {
    const notificationRepository = new NotificationRepositoryPrisma();
    this.updateNotificationUseCase = new UpdateNotificationUseCase(
      notificationRepository
    );
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);
      const notification = await this.updateNotificationUseCase.execute(
        id,
        req.body
      );

      res.status(200).json(notification);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const updateNotificationController = new UpdateNotificationController();
