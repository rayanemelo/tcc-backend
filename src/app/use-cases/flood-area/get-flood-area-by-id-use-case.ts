import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { messages } from '../../../infra/config/messages';
import { Exception } from '../../../infra/exception/exception';

export class GetFloodAreaByIdUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(id: number) {
    const floodAreas = await this.floodAreaRepository.getFloodAreaById(id);

    if (!floodAreas)
      throw new Exception(404, messages.response.floodAreaNotFound);

    return floodAreas;
  }
}
