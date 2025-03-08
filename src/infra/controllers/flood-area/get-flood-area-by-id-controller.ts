import { Request, Response } from 'express';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { GetFloodAreaByIdUseCase } from '../../../app/use-cases/flood-area/get-flood-area-by-id-use-case';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { paramIdSchema } from '../../schemas/param-id-schema';

class GetFloodAreaByIdController {
  private getFloodAreaByIdUseCase: GetFloodAreaByIdUseCase;
  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.getFloodAreaByIdUseCase = new GetFloodAreaByIdUseCase(
      floodAreaRepository
    );
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);

      const floodAreas = await this.getFloodAreaByIdUseCase.execute(id);

      res.status(200).json(floodAreas);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const getFloodAreaByIdController = new GetFloodAreaByIdController();
