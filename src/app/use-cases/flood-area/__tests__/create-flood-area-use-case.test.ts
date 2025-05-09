import { faker } from '@faker-js/faker';
import { Base64 } from '../../../../infra/utils/base-64';
import { isWithinRadius } from '../../../../infra/utils/is-within-radius';
import { FloodAreaMockFactory } from '../../../../test/factories/flood-area/flood-area-factory-mock';
import { ImageStorageMockFactory } from '../../../../test/factories/images-flood-area/image-storage-factory-mock';
import { ImagesFloodAreaMockFactory } from '../../../../test/factories/images-flood-area/images-flood-area-factory-mock';
import { FloodAreaRepositoryMock } from '../../../../test/repositories/flood-area/flood-area-repository-mock';
import { ImageStorageRepositoryMock } from '../../../../test/repositories/images-flood-area/image-storage-repository-mock';
import { ImagesFloodAreaRepositoryMock } from '../../../../test/repositories/images-flood-area/images-flood-area-repository-mock';
import { CreateFloodAreaUseCase } from '../create-flood-area-use-case';
import { Exception } from '../../../../infra/exception/exception';

jest.mock('../../../../infra/utils/is-within-radius', () => ({
  isWithinRadius: jest.fn(),
}));

jest.mock('../../../../infra/utils/base-64', () => ({
  Base64: {
    isBase64Image: jest.fn(),
  },
}));

describe('Create Flood Area Use Case', () => {
  let useCase: CreateFloodAreaUseCase;

  beforeEach(() => {
    useCase = new CreateFloodAreaUseCase(
      FloodAreaRepositoryMock,
      ImagesFloodAreaRepositoryMock,
      ImageStorageRepositoryMock
    );
    jest.clearAllMocks();
  });

  const mockUserLocation = {
    latitude: faker.number.float({ min: -90, max: 90 }).toString(),
    longitude: faker.number.float({ min: -180, max: 180 }).toString(),
  };
  const mockImageBase64 = ImageStorageMockFactory.createEntity();
  const mockFloodArea = FloodAreaMockFactory.createEntity();
  const mockImages = ImagesFloodAreaMockFactory.createEntity();

  it('should create a new flood area successfully', async () => {
    // Arrange
    (isWithinRadius as jest.Mock).mockReturnValue(true);
    (Base64.isBase64Image as jest.Mock).mockReturnValue(true);
    FloodAreaRepositoryMock.createFloodArea.mockResolvedValueOnce(
      mockFloodArea
    );

    ImageStorageRepositoryMock.uploadImageBase64.mockResolvedValueOnce(
      mockImageBase64
    );
    ImagesFloodAreaRepositoryMock.createImageFloodArea.mockResolvedValueOnce(
      mockImages
    );

    const body = {
      ...mockFloodArea,
      userLocation: mockUserLocation,
      image: mockImageBase64,
    };

    // Act
    const result = await useCase.execute(mockFloodArea.userId, body);

    // Assert
    expect(isWithinRadius).toHaveBeenCalledWith({
      latArea: Number(mockFloodArea.latitude),
      lonArea: Number(mockFloodArea.longitude),
      latUser: Number(mockUserLocation.latitude),
      lonUser: Number(mockUserLocation.longitude),
    });
    expect(FloodAreaRepositoryMock.createFloodArea).toHaveBeenCalledWith(
      mockFloodArea
    );
    expect(ImageStorageRepositoryMock.uploadImageBase64).toHaveBeenCalledWith(
      mockImageBase64
    );
    expect(
      ImagesFloodAreaRepositoryMock.createImageFloodArea
    ).toHaveBeenCalledWith(mockFloodArea.id, mockImageBase64);
    expect(result).toEqual({
      ...mockFloodArea,
    });
  });

  it('should throw an error if the user is outside the radius', async () => {
    // Arrange
    (Base64.isBase64Image as jest.Mock).mockReturnValue(true);
    (isWithinRadius as jest.Mock).mockReturnValue(false);

    ImageStorageRepositoryMock.uploadImageBase64.mockResolvedValueOnce(
      mockImageBase64
    );
    ImagesFloodAreaRepositoryMock.createImageFloodArea.mockResolvedValueOnce(
      mockImages
    );

    const body = {
      ...mockFloodArea,
      userLocation: mockUserLocation,
      image: mockImageBase64,
    };

    // Act & Assert
    await expect(useCase.execute(mockFloodArea.userId, body)).rejects.toThrow(
      Exception
    );

    expect(isWithinRadius).toHaveBeenCalledWith({
      latArea: Number(mockFloodArea.latitude),
      lonArea: Number(mockFloodArea.longitude),
      latUser: Number(mockUserLocation.latitude),
      lonUser: Number(mockUserLocation.longitude),
    });
    expect(FloodAreaRepositoryMock.createFloodArea).not.toHaveBeenCalled();
  });

  it('should throw an error if the image is not a valid base64 string', async () => {
    (Base64.isBase64Image as jest.Mock).mockReturnValue(false);
    (isWithinRadius as jest.Mock).mockReturnValue(true);

    const body = {
      ...mockFloodArea,
      userLocation: mockUserLocation,
      image: 'invalid_base64_string',
    };

    // Act & Assert
    await expect(useCase.execute(mockFloodArea.userId, body)).rejects.toThrow(
      Exception
    );
  });
});
