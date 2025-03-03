import { IFaqRepository } from '../../../domain/repositories/faq/faq-repository';
import { Exception } from '../../../infra/exception/exception';

export class GetFaqByIdUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(id: number) {
    const faq = await this.faqRepository.getFaqById(id);

    if (!faq) throw new Exception(404, 'FAQ not found');

    return faq;
  }
}
