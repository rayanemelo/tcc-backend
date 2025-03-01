import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';

export class GetByIdFloodAreaUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(id: number) {
    const floodAreas = await this.floodAreaRepository.getById(id);
    return floodAreas;
  }
}
