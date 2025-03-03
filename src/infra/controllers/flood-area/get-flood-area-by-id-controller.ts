import { NextFunction, Request, Response } from 'express';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { GetFloodAreaByIdUseCase } from '../../../app/use-cases/flood-area/get-flood-area-by-id-use-case';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';

class GetFloodAreaByIdController {
  private getFloodAreaByIdUseCase: GetFloodAreaByIdUseCase;
  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.getFloodAreaByIdUseCase = new GetFloodAreaByIdUseCase(
      floodAreaRepository
    );
  }

  handle = async (
    req: Request<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;

      const floodAreas = await this.getFloodAreaByIdUseCase.execute(id);

      res.status(200).json(floodAreas);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const getFloodAreaByIdController = new GetFloodAreaByIdController();
