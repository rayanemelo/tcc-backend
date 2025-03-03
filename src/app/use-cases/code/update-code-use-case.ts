import { CodeEntity } from '../../../domain/entities/code/code-entity';
import { ICodeRepository } from '../../../domain/repositories/code/code-repository';
import { Exception } from '../../../infra/exception/exception';
import { CodeDTO } from './create-code-use-case';

export class UpdateCodeUseCase {
  constructor(private codeRepository: ICodeRepository) {}

  async execute(id: number, body: CodeDTO): Promise<CodeEntity> {
    const code = await this.codeRepository.updateCode(id, body);

    if (!code) throw new Exception(404, 'Code not found');

    return code;
  }
}
