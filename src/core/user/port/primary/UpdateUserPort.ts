import { ResultType } from 'src/shared/Result';

export interface UpdateUserRequest {
  id: string;
  name: string;
}

export abstract class UpdateUserPort {
  abstract updateUser(
    updateUserRequest: UpdateUserRequest,
  ): Promise<ResultType<string, Error>>;
}
