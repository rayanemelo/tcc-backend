import { INotificationRepository } from '../../../domain/repositories/notification/notification-repository';
import { Exception } from '../../../infra/exception/exception';

export class GetNotificationByIdUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(id: number) {
    const notification =
      await this.notificationRepository.getNotificationById(id);

    if (!notification) throw new Exception(404, 'Notification not found');

    return notification;
  }
}
