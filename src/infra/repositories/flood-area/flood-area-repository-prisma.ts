import { FloodAreaEntity } from '../../../domain/entities/flood-area/flood-area-entity';
import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';

export class FloodAreaRepositoryPrisma implements IFloodAreaRepository {
  async listFloodAreas(): Promise<FloodAreaEntity[]> {
    // return await prisma.faq.findMany();
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<FloodAreaEntity> {
    throw new Error('Method not implemented.');
  }
  createFloodArea(floodArea: FloodAreaEntity): Promise<FloodAreaEntity> {
    throw new Error('Method not implemented.');
  }
  updateFloodArea(
    id: string,
    floodArea: Partial<FloodAreaEntity>
  ): Promise<FloodAreaEntity> {
    throw new Error('Method not implemented.');
  }
  deleteFloodArea(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
