import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { UserEntity } from '../../domain/UserEntity';
import {
  UpdateUserPort,
  UpdateUserRequest,
} from '../../port/primary/UpdateUserPort';
import { UserRepositoryPort } from '../../port/secondary/UserRepositoryPort';
@Injectable()
export class UpdateUserUseCase implements UpdateUserPort {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  async updateUser(
    updateUserRequest: UpdateUserRequest,
  ): Promise<ResultType<string, Error>> {
    const userEntity = UserEntity.create(updateUserRequest);
    if (userEntity.resultType === RESULT_TYPE.FAILED) {
      return userEntity;
    }

    const storeResult = await this.userRepositoryPort.store(userEntity.value);
    if (storeResult.resultType === RESULT_TYPE.FAILED) {
      return storeResult;
    }

    return storeResult;
  }
}
