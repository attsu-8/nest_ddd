import { Injectable } from '@nestjs/common';
import { ResultType, RESULT_TYPE } from 'src/shared/Result';
import { UserEntity } from '../../domain/UserEntity';
import { GetUsersPort } from '../../port/primary/GetUsersPort';
import { UserRepositoryPort } from '../../port/secondary/UserRepositoryPort';

@Injectable()
export class GetUsersUseCase implements GetUsersPort {
  constructor(private readonly userRepositoryPort: UserRepositoryPort) {}

  async getUsers(): Promise<ResultType<UserEntity[], Error>> {
    const users = await this.userRepositoryPort.findAll();

    if (users.resultType === RESULT_TYPE.FAILED) {
      return users;
    }

    return users;
  }
}
