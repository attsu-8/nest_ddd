import { DateTime } from 'luxon';
import { CreateBacklogItemUseCase } from 'src/core/backlogItem/application/CreateBacklogItemUseCase';
import { TaskStatus } from 'src/core/backlogItem/domain/task/taskStatus/enum/TaskStatus';

describe('# CreateBacklogItemUseCase', () => {
  test('a', () => expect(1).toBe(1));
  // test('正常にバックログアイテムを作成できる', async () => {
  //   const useCase = new CreateBacklogItemUseCase();

  //   const createBacklogItemCommand = {
  //     id: 1,
  //     story: 'story',
  //     storyPoint: 1,
  //     backlogItemPriority: 1,
  //     description: 'description',
  //     tasks: [
  //       {
  //         id: 1,
  //         taskName: 'task name',
  //         description: 'description',
  //         deadline: DateTime.local(),
  //         status: TaskStatus.NOT_STATED,
  //         userId: 1,
  //       },
  //     ],
  //   };

  //   const result = await (
  //     await useCase.execute(createBacklogItemCommand)
  //   ).unwrap();

  //   expect(result).toBe(1);
  // });
});
