import { CodeEntity } from '../../../domain/entities/code/code-entity';
import { ICodeRepository } from '../../../domain/repositories/code/code-repository';

export type CodeDTO = {
  code: string;
  userId: number;
};

export class CreateCodeUseCase {
  constructor(private codeRepository: ICodeRepository) {}

  async execute(body: CodeDTO): Promise<CodeEntity> {
    const code = await this.codeRepository.createCode(new CodeEntity(body));
    return code;
  }
}
