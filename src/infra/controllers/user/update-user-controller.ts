import { Request, Response } from 'express';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { paramIdSchema } from '../../schemas/param-id-schema';
import { UserRepositoryPrisma } from '../../repositories/user/user-repository-prisma';
import { UpdateUserUseCase } from '../../../app/use-cases/user/update-user-use-case';

class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;

  constructor() {
    const userRepository = new UserRepositoryPrisma();
    this.updateUserUseCase = new UpdateUserUseCase(userRepository);
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);
      const user = await this.updateUserUseCase.execute(id, req.body);

      res.status(200).json(user);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const updateUserController = new UpdateUserController();
