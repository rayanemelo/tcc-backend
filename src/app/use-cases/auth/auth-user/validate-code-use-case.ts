import { ICodeRepository } from '../../../../domain/repositories/code/code-repository';
import { IUserRepository } from '../../../../domain/repositories/user/user-repository';
import { ITokenService } from '../../../../domain/service/token-service';
import { Exception } from '../../../../infra/exception/exception';

export class ValidateCodeUseCase {
  constructor(
    private userRepository: IUserRepository,
    private codeRepository: ICodeRepository,
    private tokenService: ITokenService
  ) {}

  async execute(phone: string, code: string): Promise<string> {
    const user = await this.userRepository.getUserByPhone(phone);

    if (!user) {
      throw new Exception(404, 'Usuário não encontrado');
    }

    const codeEntity = await this.codeRepository.getCodeByUserId(user.id);
    console.log('codeEntity: ', codeEntity);

    if (!codeEntity) {
      throw new Exception(404, 'Código não encontrado');
    }

    if (codeEntity.code !== code) {
      throw new Exception(400, 'Código inválido');
    }

    const now = new Date();

    if (codeEntity.dateExp && now > codeEntity.dateExp) {
      throw new Exception(400, 'Código expirado');
    }

    const token = this.tokenService.generateToken({ id: user.id });

    return token;
  }
}
