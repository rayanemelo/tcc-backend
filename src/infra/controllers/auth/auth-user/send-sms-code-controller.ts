import { Request, Response } from 'express';
import { SendSmsCodeUseCase } from '../../../../app/use-cases/auth/auth-user/send-sms-code-use-case';
import { GlobalExceptionHandler } from '../../../exception/global-exception-handler';
import { CodeRepositoryPrisma } from '../../../repositories/code/code-repository-prisma';
import { UserRepositoryPrisma } from '../../../repositories/user/user-repository-prisma';
import { SmsService } from '../../../service/sms-code';

class SendSmsCodeController {
  private sendSmsCodeUseCase: SendSmsCodeUseCase;

  constructor() {
    const userRepository = new UserRepositoryPrisma();
    const codeRepository = new CodeRepositoryPrisma();
    const smsService = new SmsService();
    this.sendSmsCodeUseCase = new SendSmsCodeUseCase(
      userRepository,
      codeRepository,
      smsService
    );
  }

  handle = async (
    request: Request<unknown, unknown, { phone: string }>,
    response: Response
  ) => {
    try {
      const { phone } = request.body;
      await this.sendSmsCodeUseCase.execute(phone);

      return response.status(204).send();
    } catch (error) {
      GlobalExceptionHandler.handle(error, response);
    }
  };
}

export const sendSmsCodeController = new SendSmsCodeController();
