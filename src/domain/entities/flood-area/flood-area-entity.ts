interface CreateFloodAreaEntityArgs {
  id?: number;
  address: string;
  latitude: string;
  longitude: string;
  status?: number;
  userId: string;
  floodLevelId: number;
  commentsAdmin?: string;
  yesCount?: number;
  noCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class FloodAreaEntity {
  id: number;
  address: string;
  latitude: string;
  longitude: string;
  status: number;
  userId: string;
  floodLevelId: number;
  commentsAdmin: string | null;
  yesCount: number;
  noCount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateFloodAreaEntityArgs) {
    this.id = data.id!;
    this.address = data.address;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.status = data.status || 0;
    this.userId = data.userId;
    this.floodLevelId = data.floodLevelId;
    this.commentsAdmin = data.commentsAdmin || null;
    this.yesCount = data.yesCount || 0;
    this.noCount = data.noCount || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}
