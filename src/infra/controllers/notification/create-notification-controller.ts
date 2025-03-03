import { Request, Response } from 'express';
import { CreateNotificationUseCase } from '../../../app/use-cases/notification/create-notification-use-case';
import { NotificationRepositoryPrisma } from '../../repositories/notification/notification-repository-prisma';

class CreateNotificationController {
  private createNotificationUseCase: CreateNotificationUseCase;

  constructor() {
    const notificationRepository = new NotificationRepositoryPrisma();
    this.createNotificationUseCase = new CreateNotificationUseCase(
      notificationRepository
    );
  }

  handle = async (req: Request, res: Response) => {
    try {
      const notification = await this.createNotificationUseCase.execute(
        req.body
      );

      res.status(201).json(notification);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export const createNotificationController = new CreateNotificationController();
