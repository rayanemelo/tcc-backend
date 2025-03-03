import { CodeEntity } from '../../../domain/entities/code/code-entity';
import { ICodeRepository } from '../../../domain/repositories/code/code-repository';
import { prisma } from '../../database';

export class CodeRepositoryPrisma implements ICodeRepository {
  async getCodeById(id: number): Promise<CodeEntity | null> {
    return await prisma.code.findUnique({
      where: {
        id: Number(id),
      },
    });
  }

  async createCode(code: CodeEntity): Promise<CodeEntity> {
    return await prisma.code.create({
      data: code,
    });
  }

  async updateCode(id: number, code: Partial<CodeEntity>): Promise<CodeEntity> {
    return await prisma.code.update({
      where: {
        id: Number(id),
      },
      data: code,
    });
  }
}
