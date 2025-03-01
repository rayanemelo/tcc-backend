import { NextFunction, Request, Response } from 'express';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { GetByIdFloodAreaUseCase } from '../../../app/use-cases/flood-area/get-by-id-flood-area-use-case';

class GetByIdFloodAreaController {
  private getByIdFloodAreaUseCase: GetByIdFloodAreaUseCase;
  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.getByIdFloodAreaUseCase = new GetByIdFloodAreaUseCase(
      floodAreaRepository
    );
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const floodAreas = await this.getByIdFloodAreaUseCase.execute(Number(id));

      res.status(200).json(floodAreas);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: error });
    }
  };
}

export const getByIdFloodAreaController = new GetByIdFloodAreaController();
