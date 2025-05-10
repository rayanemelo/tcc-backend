import { FloodAreaMockFactory } from '../../../../test/factories/flood-area/flood-area-factory-mock';
import { ImagesFloodAreaMockFactory } from '../../../../test/factories/images-flood-area/images-flood-area-factory-mock';
import { FloodAreaRepositoryMock } from '../../../../test/repositories/flood-area/flood-area-repository-mock';
import { ImagesFloodAreaRepositoryMock } from '../../../../test/repositories/images-flood-area/images-flood-area-repository-mock';
import { ListActiveFloodAreaUseCase } from '../list-active-flood-area-use-case';

describe('List Active Flood Area ID Use Case', () => {
  let useCase: ListActiveFloodAreaUseCase;

  beforeEach(() => {
    useCase = new ListActiveFloodAreaUseCase(
      FloodAreaRepositoryMock,
      ImagesFloodAreaRepositoryMock
    );
    jest.clearAllMocks();
  });

  it('should list active flood areas successfully', async () => {
    const mockFloodAreas = FloodAreaMockFactory.createEntities(5);
    const mockImages = ImagesFloodAreaMockFactory.createEntity();
  });

  // it('should get a flood area by id successfully', async () => {
  //   // Arrange
  //   const mockFloodArea = FloodAreaMockFactory.createEntity();

  //   FloodAreaRepositoryMock.getFloodAreaById.mockResolvedValueOnce(
  //     mockFloodArea
  //   );

  //   // Act
  //   const result = await useCase.execute(mockFloodArea.id);

  //   // Assert
  //   expect(result).toEqual(mockFloodArea);
  // });

  // it('should throw an exception when flood area is not found', async () => {
  //   // Arrange
  //   const mockFloodAreaId = faker.number.int();

  //   FloodAreaRepositoryMock.getFloodAreaById.mockResolvedValueOnce(null);

  //   // Act & Assert
  //   await expect(useCase.execute(mockFloodAreaId)).rejects.toThrow(Exception);
  // });
});
