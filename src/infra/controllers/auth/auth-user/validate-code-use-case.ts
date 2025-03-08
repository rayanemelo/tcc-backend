import { Request, Response } from 'express';
import { ValidateCodeUseCase } from '../../../../app/use-cases/auth/auth-user/validate-code-use-case';
import { CodeRepositoryPrisma } from '../../../repositories/code/code-repository-prisma';
import { UserRepositoryPrisma } from '../../../repositories/user/user-repository-prisma';
import { TokenServiceJWT } from '../../../service/token-service-jwt';
import { GlobalExceptionHandler } from '../../../exception/global-exception-handler';

class ValidateCodeController {
  private validateCodeUseCase: ValidateCodeUseCase;

  constructor() {
    const userRepository = new UserRepositoryPrisma();
    const codeRepository = new CodeRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    this.validateCodeUseCase = new ValidateCodeUseCase(
      userRepository,
      codeRepository,
      tokenService
    );
  }

  handle = async (
    request: Request<unknown, unknown, { phone: string; code: string }>,
    response: Response
  ) => {
    try {
      const { phone, code } = request.body;
      const token = await this.validateCodeUseCase.execute(phone, code);

      return response.status(200).json({ token });
    } catch (error) {
      GlobalExceptionHandler.handle(error, response);
    }
  };
}

export const validateCodeController = new ValidateCodeController();
