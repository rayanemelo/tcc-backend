import { ImagesFloodAreaEntity } from '../../../domain/entities/images-flood-area/images-flood-area-entity';
import { IImageFloodAreaRepository } from '../../../domain/repositories/images-flood-area-storage/images-flood-area-repository';
import { prisma } from '../../database';

export class ImageFloodAreaRepositoryPrisma
  implements IImageFloodAreaRepository
{
  async createImageFloodArea(
    floodAreaId: number,
    image: string
  ): Promise<ImagesFloodAreaEntity> {
    return await prisma.images.create({
      data: {
        floodAreaId: floodAreaId,
        url: image,
      },
    });
  }

  async getImages(floodAreaId: number): Promise<string[]> {
    const images = await prisma.images.findMany({
      where: {
        floodAreaId: floodAreaId,
      },
      select: {
        url: true,
      },
    });

    return images.map((image) => image.url);
  }
}
