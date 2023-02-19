import { ResultFailed, ResultSucceeded, ResultType } from 'src/shared/Result';

export class UserNameValueObject {
  static MAX_USER_NAME_LENGTH = 30;
  private constructor(readonly value: string) {}

  static fromString(maybyName: string): ResultType<UserNameValueObject, Error> {
    if (maybyName.length > this.MAX_USER_NAME_LENGTH) {
      return new ResultFailed(
        Error(
          `user name length less than${this.MAX_USER_NAME_LENGTH}. actual: ${maybyName}`,
        ),
      );
    }
    return new ResultSucceeded(new UserNameValueObject(maybyName));
  }
}
