import { CodeEntity } from '../../entities/code/code-entity';

export interface ICodeRepository {
  getCodeById(id: number): Promise<CodeEntity | null>;
  createCode(code: CodeEntity): Promise<CodeEntity>;
  updateCode(id: number, code: Partial<CodeEntity>): Promise<CodeEntity>;
}
