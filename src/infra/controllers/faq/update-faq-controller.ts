import { Request, Response } from 'express';
import { FaqRepositoryPrisma } from '../../repositories/faq/faq-repository-prisma';
import { UpdateFaqUseCase } from '../../../app/use-cases/faq/update-faq-use-case';

class UpdateFaqController {
  private updateFaqUseCase: UpdateFaqUseCase;

  constructor() {
    const faqRepository = new FaqRepositoryPrisma();
    this.updateFaqUseCase = new UpdateFaqUseCase(faqRepository);
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = req.params;
      const faq = await this.updateFaqUseCase.execute(id, req.body);

      res.status(200).json(faq);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
}

export const updateFaqController = new UpdateFaqController();
