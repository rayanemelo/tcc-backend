import { IUserAdminRepository } from '../../../../domain/repositories/user-admin/user-admin-repository';
import { Exception } from '../../../../infra/exception/exception';
import { IHashService } from '../../../../domain/service/hash-service';
import { ITokenService } from '../../../../domain/service/token-service';
import { HashServiceBcrypt } from '../../../../infra/service/hash-service-bcrypt';
import { TokenServiceJWT } from '../../../../infra/service/token-service-jwt';

export type UserAdminResponseDTO = {
  id: number;
  name: string;
  active: boolean;
};

export type CreateSessionUserAdminDTO = {
  email: string;
  password: string;
};

export type SessionResponseDTO = {
  userAdmin: UserAdminResponseDTO;
  token: string;
};

export class CreateSessionUserAdminUseCase {
  private readonly tokenService: ITokenService;
  private readonly hashService: IHashService;

  constructor(private userAdminRepository: IUserAdminRepository) {
    this.hashService = new HashServiceBcrypt();
    this.tokenService = new TokenServiceJWT();
  }

  async execute(data: CreateSessionUserAdminDTO): Promise<SessionResponseDTO> {
    const userAdminExists = await this.userAdminRepository.findByEmail(
      data.email
    );

    if (!userAdminExists) throw new Exception(404, 'User not found');

    const passwordMatch = await this.hashService.compare(
      data.password,
      userAdminExists.password
    );

    if (!passwordMatch) throw new Exception(401, 'Not authorized');

    if (!userAdminExists.active) {
      throw new Exception(403, 'User is inactive');
    }

    const token = this.tokenService.generateToken({ id: userAdminExists.id });

    const userAdminResponse: UserAdminResponseDTO = {
      id: userAdminExists.id,
      name: userAdminExists.name,
      active: userAdminExists.active,
    };

    return {
      userAdmin: userAdminResponse,
      token,
    };
  }
}
