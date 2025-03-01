import { FaqEntity } from '../../entities/faq/faq-entity';

export interface IFaqRepository {
  listFaqs(): Promise<FaqEntity[]>;
  getById(id: number): Promise<FaqEntity | null>;
  createFaq(faq: FaqEntity): Promise<FaqEntity>;
  updateFaq(id: number, faq: Partial<FaqEntity>): Promise<FaqEntity>;
  deleteFaq(id: number): Promise<void>;
}
