import { CodeEntity } from '../../../../domain/entities/code/code-entity';
import { UserEntity } from '../../../../domain/entities/user/user-entity';
import { ICodeRepository } from '../../../../domain/repositories/code/code-repository';
import { IUserRepository } from '../../../../domain/repositories/user/user-repository';
import { ISmsService } from '../../../../domain/services/sms-service';
import { messages } from '../../../../infra/config/messages';
import { Exception } from '../../../../infra/exception/exception';
import { GenerateCode } from '../../../../infra/utils/generate-code';

export class SendSmsCodeUseCase {
  constructor(
    private userRepository: IUserRepository,
    private codeRepository: ICodeRepository,
    private smsService: ISmsService
  ) {}

  async execute(phone: string): Promise<void> {
    let user = await this.userRepository.getUserByPhone(phone);

    if (!user) {
      user = await this.userRepository.createUser(
        new UserEntity({ phone: phone })
      );
    }

    const newCode = GenerateCode.generateCode();

    let code = await this.codeRepository.getCodeByUserId(user.id);

    if (!code) {
      code = await this.codeRepository.createCode(
        new CodeEntity({ userId: user.id, code: newCode, attemptsCount: 1 })
      );
    } else {
      const now = new Date();
      const tenMinutes = 10 * 60 * 1000;
      const timeSinceLastUpdate =
        now.getTime() - new Date(code.updatedAt).getTime();

      if (code.attemptsCount >= 5 && timeSinceLastUpdate < tenMinutes) {
        throw new Exception(400, messages.response.limitExceeded);
      }

      if (timeSinceLastUpdate >= tenMinutes) {
        code.attemptsCount = 0;
      }

      code = await this.codeRepository.updateCode(code.id, {
        code: newCode,
        attemptsCount: code.attemptsCount + 1,
        dateExp: new Date(now.getTime() + tenMinutes),
      });
    }

    const message = messages.sms.codeMessage(newCode);
    console.log('message: ', message);
    await this.smsService.send(phone, message);
  }
}
