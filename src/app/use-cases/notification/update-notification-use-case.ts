import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { Exception } from '../../../infra/exception/exception';
import { NotificationDTO } from './create-notification-use-case';

export class UpdateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(id: number, body: NotificationDTO) {
    const notificationExists =
      await this.notificationRepository.getNotificationById(id);

    if (!notificationExists) throw new Exception(404, 'FAQ not found');

    const notification = await this.notificationRepository.updateNotification(
      id,
      body
    );

    return notification;
  }
}
