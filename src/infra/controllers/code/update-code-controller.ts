import { Request, Response } from 'express';
import { CodeRepositoryPrisma } from '../../repositories/code/code-repository-prisma';
import { paramIdSchema } from '../../schemas/param-id-schema';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';
import { UpdateCodeUseCase } from '../../../app/use-cases/code/update-code-use-case';

class UpdateCodeController {
  private updateCodeUseCase: UpdateCodeUseCase;

  constructor() {
    const codeRepository = new CodeRepositoryPrisma();
    this.updateCodeUseCase = new UpdateCodeUseCase(codeRepository);
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);

      const code = await this.updateCodeUseCase.execute(id, req.body);

      res.status(200).json(code);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const updateCodeController = new UpdateCodeController();
