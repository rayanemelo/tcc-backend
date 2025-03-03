import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../../app/use-cases/user/create-user-use-case';
import { UserRepositoryPrisma } from '../../repositories/user/user-repository-prisma';

class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor() {
    const userRepository = new UserRepositoryPrisma();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  handle = async (req: Request, res: Response) => {
    try {
      const user = await this.createUserUseCase.execute(req.body);

      res.status(201).json(user);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export const createUserController = new CreateUserController();
