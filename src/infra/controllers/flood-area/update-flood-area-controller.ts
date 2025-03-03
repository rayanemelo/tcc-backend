import { Request, Response } from 'express';
import { UpdateFlooadAreaUseCase } from '../../../app/use-cases/flood-area/update-flood-area-use-case';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { paramIdSchema } from '../../types/param-id-schema';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';

class UpdateFloodAreaController {
  private updateFloodAreaUseCase: UpdateFlooadAreaUseCase;

  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.updateFloodAreaUseCase = new UpdateFlooadAreaUseCase(
      floodAreaRepository
    );
  }
  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);
      const floodArea = await this.updateFloodAreaUseCase.execute(id, req.body);

      res.status(200).json(floodArea);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const updateFloodAreaController = new UpdateFloodAreaController();
