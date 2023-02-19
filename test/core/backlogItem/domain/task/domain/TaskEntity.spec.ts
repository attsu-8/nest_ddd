import { DateTime } from 'luxon';
import { TaskEntity } from 'src/core/backlogItem/domain/task/TaskEntity';
import { TaskStatus } from 'src/core/backlogItem/domain/task/taskStatus/enum/TaskStatus';
import { v4 as uuidv4 } from 'uuid';

describe('# TaskEntity', () => {
  test('正常に作成できる', () => {
    const task = TaskEntity.create({
      id: uuidv4(),
      name: 'task name',
      description: 'task description',
      deadline: DateTime.local(),
      status: TaskStatus.NOT_STATED,
      userId: uuidv4(),
    }).unwrap();

    expect(task.id).toBeTruthy();
    expect(task.name).toBe('task name');
    expect(task.description).toBe('task description');
    expect(task.deadline).toBeTruthy();
    expect(task.status).toBe(TaskStatus.NOT_STATED);
    expect(task.userId).toBeTruthy();
  });
});
