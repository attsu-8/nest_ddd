import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { UserEntity } from '../domain/UserEntity';
import {
  CreateUserCommand,
  CreateUserUseCasePort,
} from '../port/primary/CreateUserUseCasePort';
import { UserRepositoryPort } from '../port/secondary/UserRepositoryPort';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateUserUseCase implements CreateUserUseCasePort {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async execute(
    createUserCommand: CreateUserCommand,
  ): Promise<ResultType<string, Error>> {
    const userEntity = UserEntity.create({
      id: uuidv4(),
      name: createUserCommand.name,
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
