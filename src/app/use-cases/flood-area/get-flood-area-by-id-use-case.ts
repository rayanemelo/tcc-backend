import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';

export class GetFloodAreaByIdUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(id: number) {
    const floodAreas = await this.floodAreaRepository.getFloodAreaById(id);
    return floodAreas;
  }
}
