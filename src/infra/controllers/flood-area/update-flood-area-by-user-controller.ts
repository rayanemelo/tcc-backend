import { Request, Response } from 'express';

import { FloodAreaRepositoryPrisma } from '../../repositories/flood-area/flood-area-repository-prisma';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { z } from 'zod';
import { ImageFloodAreaRepositoryPrisma } from '../../repositories/images-flood-area/images-flood-area-prisma';
import {
  UpdateFloodAreaByUserDTO,
  UpdateFloodAreaByUserUseCase,
} from '../../../app/use-cases/flood-area/update-flood-area-by-user-use-case';

const bodySchema = z.object({
  id: z.coerce.number(),
  yesCount: z.number(),
  noCount: z.number(),
  image: z.string(),
});

class UpdateFloodAreaByUserController {
  private updateFloodAreaByUserUseCase: UpdateFloodAreaByUserUseCase;

  constructor() {
    const floodAreaRepository = new FloodAreaRepositoryPrisma();
    const imageFloodAreaRepository = new ImageFloodAreaRepositoryPrisma();
    this.updateFloodAreaByUserUseCase = new UpdateFloodAreaByUserUseCase(
      floodAreaRepository,
      imageFloodAreaRepository
    );
  }

  handle = async (
    req: Request<unknown, unknown, { body: UpdateFloodAreaByUserDTO }>,
    res: Response
  ) => {
    try {
      const userId = req.userId;

      const body = bodySchema.parse(req.body);

      const floodArea = await this.updateFloodAreaByUserUseCase.execute(
        userId,
        body
      );

      res.status(200).json(floodArea);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const updateFloodAreaByUserController =
  new UpdateFloodAreaByUserController();
