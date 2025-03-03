interface CreateUserEntityArgs {
  id?: number;
  phone: string;
  codeId: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  id: number;
  phone: string;
  codeId: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CreateUserEntityArgs) {
    this.id = data.id!;
    this.phone = data.phone;
    this.codeId = data.codeId;
    this.active = data.active || true;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}
