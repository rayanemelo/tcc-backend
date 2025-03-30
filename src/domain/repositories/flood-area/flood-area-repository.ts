import { FloodAreaEntity } from '../../entities/flood-area/flood-area-entity';

export type ListFloodAreaParams = {
  active?: 'active' | 'inactive' | 'all';
  userId?: number;
};

export interface IFloodAreaRepository {
  listFloodAreas(param?: ListFloodAreaParams): Promise<FloodAreaEntity[]>;
  getFloodAreaById(id: number): Promise<FloodAreaEntity | null>;
  createFloodArea(floodArea: FloodAreaEntity): Promise<FloodAreaEntity>;
}
