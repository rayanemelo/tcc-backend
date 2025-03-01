import { FaqEntity } from '../../../domain/entities/faq/faq-entity';
import { IFaqRepository } from '../../../domain/repositories/faq/faq-repository';

export class CreateFaqUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(body: FaqEntity): Promise<FaqEntity> {
    const faq = await this.faqRepository.createFaq(body);
    return faq;
  }
}
