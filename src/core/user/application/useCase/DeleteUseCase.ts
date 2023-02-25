import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import {
  DeleteUserPort,
  DeleteUserRequest,
} from '../../port/primary/DeleteUserPort';
import { UserRepositoryPort } from '../../port/secondary/UserRepositoryPort';

@Injectable()
export class DeleteUserUseCase implements DeleteUserPort {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  async deleteUser(
    deleteUserRequest: DeleteUserRequest,
  ): Promise<ResultType<string, Error>> {
    const result = await this.userRepositoryPort.delete(deleteUserRequest.id);
    if (result.resultType === RESULT_TYPE.FAILED) {
      return result;
    }

    return result;
  }
}
