import { Request, Response } from 'express';
import { CreateFaqUseCase } from '../../../app/use-cases/faq/create-faq-use-case';
import { FaqRepositoryPrisma } from '../../repositories/faq/faq-repository-prisma';

class CreateFaqController {
  private createFaqUseCase: CreateFaqUseCase;

  constructor() {
    const faqRepository = new FaqRepositoryPrisma();
    this.createFaqUseCase = new CreateFaqUseCase(faqRepository);
  }

  handle = async (req: Request, res: Response) => {
    try {
      const faq = await this.createFaqUseCase.execute(req.body);

      res.status(201).json(faq);
    } catch (error) {
      console.error('error: ', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  };
}

export const createFaqController = new CreateFaqController();
