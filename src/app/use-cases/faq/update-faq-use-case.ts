import { FaqEntity } from '../../../domain/entities/faq/faq-entity';
import { IFaqRepository } from '../../../domain/repositories/faq/faq-repository';

export class UpdateFaqUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(id: number, body: FaqEntity): Promise<FaqEntity> {
    const faq = await this.faqRepository.updateFaq(id, body);

    return faq;
  }
}
