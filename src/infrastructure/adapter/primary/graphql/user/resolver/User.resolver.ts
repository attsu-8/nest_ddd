import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserPort } from 'src/core/user/port/primary/CreateUserPort';
import { DeleteUserPort } from 'src/core/user/port/primary/DeleteUserPort';
import { GetUsersPort } from 'src/core/user/port/primary/GetUsersPort';
import { UpdateUserPort } from 'src/core/user/port/primary/UpdateUserPort';
import { RESULT_TYPE } from 'src/shared/Result';
import { User } from '../model/User.model';

@Resolver()
export class UserResolver {
  constructor(
    private readonly getUsersPort: GetUsersPort,
    private readonly createUserPort: CreateUserPort,
    private readonly updateUserPort: UpdateUserPort,
    private readonly deleteUserPort: DeleteUserPort,
  ) {}

  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    const getResult = await this.getUsersPort.getUsers();
    if (getResult.resultType === RESULT_TYPE.FAILED) {
      return [];
    }

    return getResult.value.map((user) => {
      return {
        id: user.id,
        name: user.name.value,
      };
    });
  }

  @Mutation(() => String)
  async createUser(
    @Args({ name: 'name', type: () => String })
    name: string,
  ): Promise<string> {
    const createResult = await this.createUserPort.createUser({
      name: name,
    });
    if (createResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return createResult.value;
  }

  @Mutation(() => String)
  async updateUser(
    @Args({ name: 'id', type: () => String })
    id: string,
    @Args({ name: 'name', type: () => String })
    name: string,
  ): Promise<string> {
    const updateResult = await this.updateUserPort.updateUser({
      id: id,
      name: name,
    });
    if (updateResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return updateResult.value;
  }

  @Mutation(() => String)
  async deleteUser(
    @Args({ name: 'id', type: () => String })
    id: string,
  ): Promise<string> {
    const deleteResult = await this.deleteUserPort.deleteUser({
      id: id,
    });
    if (deleteResult.resultType === RESULT_TYPE.FAILED) {
      return 'todo';
    }

    return deleteResult.value;
  }
}
