import { Request, Response } from 'express';
import { UpdateFlooadAreaUseCase } from '../../../app/use-cases/flood-area/update-flood-area-use-case';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { paramIdSchema } from '../../schemas/param-id-schema';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { FloodAreaDTO } from '../../../app/use-cases/flood-area/create-flood-area-use-case';
import { z } from 'zod';

const bodySchema = z.object({
  address: z.string(),
  latitude: z.string(),
  longitude: z.string(),
  status: z.string(),
  userId: z.number(),
  floodLevelId: z.number(),
});

class UpdateFloodAreaController {
  private updateFloodAreaUseCase: UpdateFlooadAreaUseCase;

  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.updateFloodAreaUseCase = new UpdateFlooadAreaUseCase(
      floodAreaRepository
    );
  }
  handle = async (
    req: Request<{ id: number; body: FloodAreaDTO }>,
    res: Response
  ) => {
    try {
      const { id } = paramIdSchema.parse(req.params);
      const body = bodySchema.parse(req.body);
      const floodArea = await this.updateFloodAreaUseCase.execute(id, body);

      res.status(200).json(floodArea);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const updateFloodAreaController = new UpdateFloodAreaController();
