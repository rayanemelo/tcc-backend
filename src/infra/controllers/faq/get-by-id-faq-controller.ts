import { NextFunction, Request, Response } from 'express';
import { FaqRepositoryPrisma } from '../../repositories/faq/faq-repository-prisma';
import { GetByIdFaqUseCase } from '../../../app/use-cases/faq/get-by-id-use-case';

class GetByIdFaqController {
  private getByIdFaqUseCase: GetByIdFaqUseCase;

  constructor() {
    const faqRepository = new FaqRepositoryPrisma();
    this.getByIdFaqUseCase = new GetByIdFaqUseCase(faqRepository);
  }

  handle = async (
    req: Request<{ id: number }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const faq = await this.getByIdFaqUseCase.execute(id);

      if (!faq) {
        return res.status(404).json({ message: 'Not found' });
      }

      res.status(200).json(faq);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
}

export const getByIdFaqController = new GetByIdFaqController();
