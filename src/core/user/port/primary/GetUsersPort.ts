import { ResultType } from 'src/shared/Result';
import { UserEntity } from '../../domain/UserEntity';

export abstract class GetUsersPort {
  abstract getUsers(): Promise<ResultType<UserEntity[], Error>>;
}
