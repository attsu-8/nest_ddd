import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { UserEntity } from '../domain/UserEntity';
import { GetUsersUseCasePort } from '../port/primary/GetUsersUseCasePort';
import { UserRepositoryPort } from '../port/secondary/UserRepositoryPort';

@Injectable()
export class GetUsersUseCase implements GetUsersUseCasePort {
  constructor(private userRepositoryPort: UserRepositoryPort) {}

  async execute(): Promise<ResultType<UserEntity[], Error>> {
    const users = await this.userRepositoryPort.findAll();

    if (users.resultType === RESULT_TYPE.FAILED) {
      return users;
    }

    return users;
  }
}
