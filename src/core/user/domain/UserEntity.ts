import { ResultSucceeded, ResultType, RESULT_TYPE } from 'src/shared/Result';
import { UserNameValueObject } from './userName/valueObject/UserNameValueObject';

interface UserEntityFactoryParams {
  id: string;
  name: string;
}
export class UserEntity {
  private constructor(
    public readonly id: string,
    public readonly name: UserNameValueObject,
  ) {}

  static create(
    params: UserEntityFactoryParams,
  ): ResultType<UserEntity, Error> {
    const userName = UserNameValueObject.fromString(params.name);
    if (userName.resultType === RESULT_TYPE.FAILED) {
      return userName;
    }
    return new ResultSucceeded(new UserEntity(params.id, userName.value));
  }
}
