import { ResultType } from 'src/shared/Result';

export interface CreateUserCommand {
  name: string;
}

export abstract class CreateUserUseCasePort {
  abstract execute(
    createUserCommand: CreateUserCommand,
  ): Promise<ResultType<string, Error>>;
}
