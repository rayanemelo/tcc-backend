import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { IImageFloodAreaRepository } from '../../../domain/repositories/images-flood-area-storage/images-flood-area-repository';
import { messages } from '../../../infra/config/messages';
import { Exception } from '../../../infra/exception/exception';

export type UpdateFloodAreaByUserDTO = {
  id: number;
  yesCount: number;
  noCount: number;
  image: string;
};

export class UpdateFloodAreaByUserUseCase {
  constructor(
    private floodAreaRepository: IFloodAreaRepository,
    private imageFloodAreaRepository: IImageFloodAreaRepository
  ) {}

  async execute(userId: number, body: UpdateFloodAreaByUserDTO) {
    const { id } = body;

    const floodAreaExists = await this.floodAreaRepository.getFloodAreaById(id);

    if (!floodAreaExists)
      throw new Exception(404, messages.response.floodAreaNotFound);

    const floodArea = await this.floodAreaRepository.updateFloodArea(id, body);

    if (body.image) {
      await this.imageFloodAreaRepository.createImageFloodArea(id, body.image);
    }

    return floodArea;
  }
}
