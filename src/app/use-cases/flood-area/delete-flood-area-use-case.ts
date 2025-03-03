import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { Exception } from '../../../infra/exception/exception';

export class DeleteFloodAreaUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(id: number): Promise<void> {
    const floodAreaExists = await this.floodAreaRepository.getFloodAreaById(id);

    if (!floodAreaExists) throw new Exception(404, 'Flood Area not found');

    await this.floodAreaRepository.deleteFloodArea(id);
  }
}
