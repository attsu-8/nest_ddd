import { ResultType } from 'src/shared/Result';

export interface CreateUserRequest {
  name: string;
}

export abstract class CreateUserPort {
  abstract createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<ResultType<string, Error>>;
}
