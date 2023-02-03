import { TaskName } from 'src/core/task/domain/valueObject/TaskName';

describe('# TaskName', () => {
  test('hoge', () => {
    const taskName = new TaskName('hoge');
    expect(taskName.value).toBe('hoge');
  });
});
