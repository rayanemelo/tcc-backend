import { Request, Response } from 'express';
import { CreateSessionUserAdminUseCase } from '../../../../app/use-cases/auth/auth-user-admin/create-session-user-admin-use-case';
import { UserAdminRepositoryPrisma } from '../../../repositories/user-admin/user-admin-prisma';
import { GlobalExceptionHandler } from '../../../exception/global-exception-handler';
import { HashServiceBcrypt } from '../../../service/hash-service-bcrypt';
import { TokenServiceJWT } from '../../../service/token-service-jwt';

export class CreateSessionUserAdminController {
  private createSessionUserAdminUseCase: CreateSessionUserAdminUseCase;

  constructor() {
    const userAdminRepository = new UserAdminRepositoryPrisma();
    const tokenService = new TokenServiceJWT();
    const hashService = new HashServiceBcrypt();

    this.createSessionUserAdminUseCase = new CreateSessionUserAdminUseCase(
      userAdminRepository,
      tokenService,
      hashService
    );
  }

  handle = async (request: Request, response: Response) => {
    try {
      const session = await this.createSessionUserAdminUseCase.execute(
        request.body
      );

      return response.status(200).json(session);
    } catch (error) {
      GlobalExceptionHandler.handle(error, response);
    }
  };
}

export const createSessionUserAdminController =
  new CreateSessionUserAdminController();
