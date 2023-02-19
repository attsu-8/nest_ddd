import { ResultType } from 'src/shared/Result';
import { UserEntity } from '../../domain/UserEntity';

export abstract class GetUsersUseCasePort {
  abstract execute(): Promise<ResultType<UserEntity[], Error>>;
}
