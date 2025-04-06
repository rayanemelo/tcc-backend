import { FloodAreaEntity } from '../../../domain/entities/flood-area/flood-area-entity';
import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { IImageStorageRepository } from '../../../domain/repositories/images-flood-area-storage/image-storage-repository';
import { IImageFloodAreaRepository } from '../../../domain/repositories/images-flood-area-storage/images-flood-area-repository';
import { Exception } from '../../../infra/exception/exception';
import { Base64 } from '../../../infra/utils/base-64';
import { isWithinRadius } from '../../../infra/utils/is-within-radius';

export type FloodAreaDTO = {
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  floodLevelId: number;
  image: string;
  userLocation: {
    latitude: string;
    longitude: string;
  };
};

export type FloodAreaResponseDTO = {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  userId: number;
  floodLevelId: number;
  commentsAdmin: string | null;
  yesCount: number;
  noCount: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  // image: {
  //   id: number;
  //   url: string;
  //   createdAt: Date;
  //   updatedAt: Date;
  // };
};

export class CreateFloodAreaUseCase {
  constructor(
    private floodAreaRepository: IFloodAreaRepository,
    private imageFloodAreaRepository: IImageFloodAreaRepository,
    private imageStorageRepository: IImageStorageRepository
  ) {}

  async execute(
    userId: number,
    body: FloodAreaDTO
  ): Promise<FloodAreaResponseDTO> {
    const { latitude, longitude, userLocation } = body;

    const coordinates = {
      latArea: Number(latitude),
      lonArea: Number(longitude),
      latUser: Number(userLocation.latitude),
      lonUser: Number(userLocation.longitude),
    };

    if (!isWithinRadius(coordinates)) {
      throw new Exception(
        400,
        'Flood area location is not within the user location radius'
      );
    }

    const floodArea = await this.floodAreaRepository.createFloodArea(
      new FloodAreaEntity({ ...body, userId })
    );

    const { image } = body;
    const isBase64Image = Base64.isBase64Image(image);

    if (!isBase64Image) throw new Exception(400, 'Image is not a valid base64');

    const imageFloodArea =
      await this.imageStorageRepository.uploadImageBase64(image);

    await this.imageFloodAreaRepository.createImageFloodArea(
      floodArea.id,
      imageFloodArea
    );

    return {
      ...floodArea,
      // image: imageEntity,
    };
  }
}
