import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserUseCasePort } from 'src/core/user/port/primary/CreateUserUseCasePort';
import { GetUsersUseCasePort } from 'src/core/user/port/primary/GetUsersUseCasePort';
import { RESULT_TYPE } from 'src/shared/Result';
import { User } from '../models/User.model';

@Resolver()
export class UserResolver {
  constructor(
    private getUsersUseCase: GetUsersUseCasePort,
    private createUserUseCase: CreateUserUseCasePort,
  ) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const users = await this.getUsersUseCase.execute();
    if (users.resultType === RESULT_TYPE.FAILED) {
      return [];
    }

    const formatted = users.value.map((user) => {
      return {
        id: user.id,
        name: user.name.value,
      };
    });

    return formatted;
  }

  @Mutation(() => Number)
  async createOneUser(
    @Args({ name: 'name', type: () => String })
    name: string,
  ): Promise<number> {
    const result = await this.createUserUseCase.execute({
      name: name,
    });
    if (result.resultType === RESULT_TYPE.FAILED) {
      return 0;
    }

    return 1;
  }
}
