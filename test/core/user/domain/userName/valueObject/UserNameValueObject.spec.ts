import { UserNameValueObject } from 'src/core/user/domain/userName/valueObject/UserNameValueObject';
import { RESULT_TYPE } from 'src/shared/Result';

describe('# UserNameValueObject', () => {
  test('正常に作成できる', () => {
    const userName = UserNameValueObject.fromString('name').unwrap();

    expect(userName.value).toBe('name');
  });

  test('30文字を超えた場合エラー', () => {
    const userName = UserNameValueObject.fromString('a'.repeat(31));

    expect(userName.resultType).toBe(RESULT_TYPE.FAILED);
  });
});
