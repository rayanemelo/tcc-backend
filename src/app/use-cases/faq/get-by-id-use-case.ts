import { IFaqRepository } from '../../../domain/repositories/faq/faq-repository';

export class GetByIdFaqUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(id: number) {
    const faq = await this.faqRepository.getById(id);
    return faq;
  }
}
