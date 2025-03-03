import { Request, Response } from 'express';
import { DeleteFloodAreaUseCase } from '../../../app/use-cases/flood-area/delete-flood-area-use-case';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { paramIdSchema } from '../../types/param-id-schema';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';

class DeleteFloodAreaController {
  private readonly deleteFloodAreaUseCase: DeleteFloodAreaUseCase;

  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.deleteFloodAreaUseCase = new DeleteFloodAreaUseCase(
      floodAreaRepository
    );
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);

      await this.deleteFloodAreaUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const deleteFloodAreaController = new DeleteFloodAreaController();
