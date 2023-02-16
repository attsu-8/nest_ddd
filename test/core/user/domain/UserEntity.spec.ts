import { UserEntity } from 'src/core/user/domain/UserEntity';

describe('# UserEntity', () => {
  test('正常に作成できる', () => {
    const user = UserEntity.create({
      id: 'id',
      name: 'name',
    }).unwrap();

    expect(user.id).toBeTruthy();
    expect(user.name.value).toBe('name');
  });
});
