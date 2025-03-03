import { UserEntity } from '../../../domain/entities/user/user-entity';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';
import { Exception } from '../../../infra/exception/exception';
import { UserDTO } from './create-user-use-case';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, body: UserDTO): Promise<UserEntity> {
    const user = await this.userRepository.updateUser(id, body);

    if (!user) throw new Exception(404, 'User not found');

    return user;
  }
}
