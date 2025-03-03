import { Request, Response } from 'express';
import { GetCodeByIdUseCase } from '../../../app/use-cases/code/get-code-by-id-use-case';
import { CodeRepositoryPrisma } from '../../repositories/code/code-repository-prisma';
import { paramIdSchema } from '../../schemas/param-id-schema';
import { GlobalExceptionHandler } from '../../exception/global-exception-handler';

class GetCodeById {
  private getCodeByIdUseCase: GetCodeByIdUseCase;

  constructor() {
    const codeRepository = new CodeRepositoryPrisma();
    this.getCodeByIdUseCase = new GetCodeByIdUseCase(codeRepository);
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = paramIdSchema.parse(req.params);

      const code = await this.getCodeByIdUseCase.execute(id);

      res.status(200).json(code);
    } catch (error) {
      GlobalExceptionHandler.handle(error, res);
    }
  };
}

export const getCodeByIdController = new GetCodeById();
