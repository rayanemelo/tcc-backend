import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';

export class ListActiveFloodAreaUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute() {
    const activeFloodAreas = await this.floodAreaRepository.listFloodAreas({
      active: 'active',
    });

    return activeFloodAreas;
  }
}
