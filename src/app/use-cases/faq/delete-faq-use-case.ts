import { IFaqRepository } from '../../../domain/repositories/faq/faq-repository';

export class DeleteFaqUseCase {
  constructor(private faqRepository: IFaqRepository) {}

  async execute(id: number): Promise<void> {
    await this.faqRepository.deleteFaq(id);
  }
}
