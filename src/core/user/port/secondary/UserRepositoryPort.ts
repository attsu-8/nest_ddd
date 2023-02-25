import { ResultType } from 'src/shared/Result';
import { UserEntity } from '../../domain/UserEntity';

export abstract class UserRepositoryPort {
  abstract findAll(): Promise<ResultType<UserEntity[], Error>>;

  abstract store(UserEntity: UserEntity): Promise<ResultType<string, Error>>;

  abstract delete(id: string): Promise<ResultType<string, Error>>;
}
