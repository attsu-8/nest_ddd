import { TaskName } from './TaskName';

describe('# TaskName', () => {
  test('hoge', () => {
    const taskName = new TaskName('hoge');
    expect(taskName.value).toBe('hoge');
  });
});
