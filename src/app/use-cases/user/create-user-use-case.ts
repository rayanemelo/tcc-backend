import { UserEntity } from '../../../domain/entities/user/user-entity';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';

export type UserDTO = {
  phone: string;
  codeId: number;
};

export class CreateUserUseCase {
  constructor(private UserRepository: IUserRepository) {}

  async execute(body: UserDTO): Promise<UserEntity> {
    const user = await this.UserRepository.createUser(new UserEntity(body));
    return user;
  }
}
