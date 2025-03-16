import { FloodAreaEntity } from '../../../domain/entities/flood-area/flood-area-entity';
import { IFloodAreaRepository } from '../../../domain/repositories/flood-area/flood-area-repository';
import { IUserRepository } from '../../../domain/repositories/user/user-repository';

export type FloodAreaDTO = {
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  userId: number;
  floodLevelId: number;
};

export class CreateFloodAreaUseCase {
  constructor(
    private userRepository: IUserRepository,
    private floodAreaRepository: IFloodAreaRepository
  ) {}

  async execute(userId: number, body: FloodAreaDTO): Promise<FloodAreaEntity> {
    let user = await this.userRepository.getUserById(userId);
    console.log('user: ', user);

    const floodArea = await this.floodAreaRepository.createFloodArea(
      new FloodAreaEntity(body)
    );
    return floodArea;
  }
}
