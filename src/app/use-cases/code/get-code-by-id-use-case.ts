import { ICodeRepository } from '../../../domain/repositories/code/code-repository';
import { Exception } from '../../../infra/exception/exception';

export class GetCodeByIdUseCase {
  constructor(private codeRepository: ICodeRepository) {}

  async execute(id: number) {
    const code = await this.codeRepository.getCodeById(id);

    if (!code) throw new Exception(404, 'Code not found');

    return code;
  }
}
