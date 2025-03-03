import { IFaqRepository } from '../../../domain/repositories/faq/faq-repository';
import { Exception } from '../../../infra/exception/exception';

export class DeleteFaqUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(id: number): Promise<void> {
    const faqExists = await this.faqRepository.getFaqById(id);

    if (!faqExists) throw new Exception(404, 'FAQ not found');

    await this.faqRepository.deleteFaq(id);
  }
}
