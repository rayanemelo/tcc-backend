import { UserAdminEntity } from '../../../domain/entities/user-admin/user-admin-entity';
import { IUserAdminRepository } from '../../../domain/repositories/user-admin/user-admin-repository';
import { messages } from '../../../infra/config/messages';
import { Exception } from '../../../infra/exception/exception';

export type UserAdminDTO = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserAdminUseCase {
  constructor(private userAdminRepository: IUserAdminRepository) {}

  async execute(body: UserAdminDTO): Promise<UserAdminEntity> {
    const user = await this.userAdminRepository.createUserAdmin(
      new UserAdminEntity(body)
    );

    if (!user) throw new Exception(400, messages.response.notCreated);

    return user;
  }
}
