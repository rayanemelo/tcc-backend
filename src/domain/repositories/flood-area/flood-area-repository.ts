import { FloodAreaEntity } from '../../entities/flood-area/flood-area-entity';

export interface IFloodAreaRepository {
  listFloodAreas(): Promise<FloodAreaEntity[]>;
  getById(id: string): Promise<FloodAreaEntity>;
  createFloodArea(floodArea: FloodAreaEntity): Promise<FloodAreaEntity>;
  updateFloodArea(
    id: string,
    floodArea: Partial<FloodAreaEntity>
  ): Promise<FloodAreaEntity>;
  deleteFloodArea(id: string): Promise<void>;
}
