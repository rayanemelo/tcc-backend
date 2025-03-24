import { ImagesFloodAreaEntity } from '../../entities/images-flood-area/images-flood-area-entity';

export interface IImageFloodAreaRepository {
  createImageFloodArea(
    floodAreaId: number,
    image: string
  ): Promise<ImagesFloodAreaEntity>;
  getImages(id: number): Promise<string[]>;
}
