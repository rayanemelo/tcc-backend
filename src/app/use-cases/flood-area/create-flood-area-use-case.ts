import { FloodAreaEntity } from '../../../domain/entities/flood-area/flood-area-entity';
import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';

export type FloodAreaDTO = {
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  floodLevelId: number;
};

export class CreateFloodAreaUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(userId: number, body: FloodAreaDTO): Promise<FloodAreaEntity> {
    const floodArea = await this.floodAreaRepository.createFloodArea(
      new FloodAreaEntity({ ...body, userId })
    );
    return floodArea;
  }
}
