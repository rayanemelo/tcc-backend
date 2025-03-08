import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { messages } from '../../../infra/config/messages';
import { Exception } from '../../../infra/exception/exception';
import { FloodAreaDTO } from './create-flood-area-use-case';

export class UpdateFlooadAreaUseCase {
  constructor(private floodAreaRepository: IFloodAreaRepository) {}

  async execute(id: number, body: FloodAreaDTO) {
    const floodAreaExists = await this.floodAreaRepository.getFloodAreaById(id);

    if (!floodAreaExists)
      throw new Exception(404, messages.response.floodAreaNotFound);

    const floodArea = await this.floodAreaRepository.updateFloodArea(id, body);

    return floodArea;
  }
}
