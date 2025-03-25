import { FloodAreaEntity } from '../../../domain/entities/flood-area/flood-area-entity';
import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { prisma } from '../../database';

export class FloodAreaRepositoryPrisma implements IFloodAreaRepository {
  async listFloodAreas(): Promise<FloodAreaEntity[]> {
    return await prisma.floodArea.findMany();
  }

  async getFloodAreaById(id: number): Promise<FloodAreaEntity | null> {
    return await prisma.floodArea.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async createFloodArea(floodArea: FloodAreaEntity): Promise<FloodAreaEntity> {
    return await prisma.floodArea.create({
      data: floodArea,
    });
  }
}
