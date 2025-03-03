import { Request, Response } from 'express';
import { CreateFloodAreaUseCase } from '../../../app/use-cases/flood-area/create-flood-area-use-case';
import { z } from 'zod';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';

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
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.createFloodAreaUseCase = new CreateFloodAreaUseCase(
      floodAreaRepository
    );
  }

  handle = async (req: Request, res: Response) => {
    try {
      const body = bodySchema.parse(req.body);

      const floodArea = await this.createFloodAreaUseCase.execute(body);

      res.status(201).json(floodArea);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const createFloodAreaController = new CreateFloodAreaController();
