import { NextFunction, Request, Response } from 'express';
import { ListFloodAreaUseCase } from '../../../app/use-cases/flood-area/list-flood-area-use-case';
import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';

class ListFloodAreaController {
  private listFloodAreaUseCase: ListFloodAreaUseCase;

  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    this.listFloodAreaUseCase = new ListFloodAreaUseCase(floodAreaRepository);
  }

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const floodAreas = await this.listFloodAreaUseCase.execute();
      res.status(200).json(floodAreas);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: error });
    }
  };
}

export const listFloodAreaController = new ListFloodAreaController();
