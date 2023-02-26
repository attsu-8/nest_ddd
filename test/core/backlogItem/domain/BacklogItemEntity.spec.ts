import { DateTime } from 'luxon';
import { BacklogItemEntity } from 'src/core/backlogItem/domain/BacklogItemEntiry';
import { v4 as uuidv4 } from 'uuid';

describe('# BacklogItemEntity', () => {
  test('正常にバックログアイテムを作成できる', () => {
    const backlogItem = BacklogItemEntity.create({
      id: uuidv4(),
      story: 'User Story',
      storyPoint: 1,
      backlogItemPriority: 1,
      description: 'description',
      productBacklogId: 'hoge',
      tasks: [
        {
          id: uuidv4(),
          name: 'task name',
          description: 'task description',
          deadline: DateTime.local(),
          status: 1,
          userId: uuidv4(),
        },
      ],
    }).unwrap();

    expect(backlogItem.id).toBeTruthy();
  });
});
test('a', () => {
  expect(1).toBe(1);
});
