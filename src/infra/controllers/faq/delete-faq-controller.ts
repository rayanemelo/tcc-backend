import { Request, Response } from 'express';
import { FaqRepositoryPrisma } from '../../repositories/faq/faq-repository-prisma';
import { DeleteFaqUseCase } from '../../../app/use-cases/faq/delete-faq-use-case';

class DeleteFaqController {
  private deleteFaqUseCase: DeleteFaqUseCase;

  constructor() {
    const faqRepository = new FaqRepositoryPrisma();
    this.deleteFaqUseCase = new DeleteFaqUseCase(faqRepository);
  }

  handle = async (req: Request<{ id: number }>, res: Response) => {
    try {
      const { id } = req.params;
      const faq = await this.deleteFaqUseCase.execute(id);

      res.status(200).json(faq);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
}

export const deleteFaqController = new DeleteFaqController();
