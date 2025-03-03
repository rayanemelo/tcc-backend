import { Request, Response } from 'express';
import { CreateCodeUseCase } from '../../../app/use-cases/code/create-code-use-case';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { CodeRepositoryPrisma } from '../../repositories/code/code-repository-prisma';
import { z } from 'zod';

const bodySchema = z.object({
  code: z.string(),
  userId: z.number(),
});

class CreateCodeController {
  private createCodeUseCase: CreateCodeUseCase;

  constructor() {
    const codeRepository = new CodeRepositoryPrisma();
    this.createCodeUseCase = new CreateCodeUseCase(codeRepository);
  }

  handle = async (req: Request, res: Response) => {
    try {
      const body = bodySchema.parse(req.body);

      const code = await this.createCodeUseCase.execute(body);

      res.status(201).json(code);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const createCodeController = new CreateCodeController();
