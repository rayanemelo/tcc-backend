import { FloodAreaEntity } from '../../entities/flood-area/flood-area-entity';

export interface IFloodAreaRepository {
  listFloodAreas(): Promise<FloodAreaEntity[]>;
  getFloodAreaById(id: number): Promise<FloodAreaEntity | null>;
  createFloodArea(floodArea: FloodAreaEntity): Promise<FloodAreaEntity>;
  updateFloodArea(
    id: number,
    floodArea: Partial<FloodAreaEntity>
  ): Promise<FloodAreaEntity>;
  deleteFloodArea(id: number): Promise<void>;
}
