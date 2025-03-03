import { FloodAreaEntity } from '../../../domain/entities/flood-area/flood-area-entity';
import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';

export type FloodAreaDTO = {
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  userId: number;
  floodLevelId: number;
};

export class CreateFloodAreaUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(body: FloodAreaDTO): Promise<FloodAreaEntity> {
    const floodArea = await this.floodAreaRepository.createFloodArea(
      new FloodAreaEntity(body)
    );
    return floodArea;
  }
}
