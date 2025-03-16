import { Request, Response } from 'express';
import {
  CreateFloodAreaUseCase,
  FloodAreaDTO,
} from '../../../app/use-cases/flood-area/create-flood-area-use-case';
import { z } from 'zod';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { UserRepositoryPrisma } from '../../repositories/user/user-repository-prisma';

const bodySchema = z.object({
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  status: z.string(),
  userId: z.number(),
  floodLevelId: z.number(),
});

class CreateFloodAreaController {
  private createFloodAreaUseCase: CreateFloodAreaUseCase;

  constructor() {
    const userRepository = new UserRepositoryPrisma();

    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.createFloodAreaUseCase = new CreateFloodAreaUseCase(
      userRepository,
      floodAreaRepository
    );
  }

  handle = async (req: Request<FloodAreaDTO>, res: Response) => {
    try {
      console.log('body: ', req.body);
      const body = bodySchema.parse(req.body);

      const userId = req.body.userId;

      const floodArea = await this.createFloodAreaUseCase.execute(userId, body);

      res.status(201).json(floodArea);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const createFloodAreaController = new CreateFloodAreaController();
