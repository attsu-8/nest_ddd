import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { UserEntity } from '../../domain/UserEntity';
import {
  CreateUserRequest,
  CreateUserPort,
} from '../../port/primary/CreateUserPort';
import { UserRepositoryPort } from '../../port/secondary/UserRepositoryPort';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUserUseCase implements CreateUserPort {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<ResultType<string, Error>> {
    const userEntity = UserEntity.create({
      id: uuidv4(),
      name: createUserRequest.name,
    });
    if (userEntity.resultType === RESULT_TYPE.FAILED) {
      return userEntity;
    }

    const result = await this.userRepositoryPort.store(userEntity.value);
    if (result.resultType === RESULT_TYPE.FAILED) {
      return result;
    }

    return result;
  }
}
