import { ResultType } from 'src/shared/Result';

export interface DeleteUserRequest {
  id: string;
}

export abstract class DeleteUserPort {
  abstract deleteUser(
    deleteUserRequest: DeleteUserRequest,
  ): Promise<ResultType<string, Error>>;
}
