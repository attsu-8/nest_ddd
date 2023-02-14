import { BacklogItemPriorityValueObject } from 'src/core/backlogItem/domain/backlogItemPriority/valueObject/BacklogItemPriority';
import { RESULT_TYPE } from 'src/shared/Result';

describe('# BacklogItemPriority', () => {
  const testTable = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
  ];

  test.each(testTable)('1~5の数値で優先順位を設定できる', (input, expected) => {
    const backlogItemPriority =
      BacklogItemPriorityValueObject.create(input).unwrap();

    expect(backlogItemPriority.value).toBe(expected);
  });

  test('0は設定できない', () => {
    const backlogItemPriority = BacklogItemPriorityValueObject.create(0);

    expect(backlogItemPriority.resultType).toBe(RESULT_TYPE.FAILED);
  });

  test('5より大きい数字はは設定できない', () => {
    const backlogItemPriority = BacklogItemPriorityValueObject.create(6);

    expect(backlogItemPriority.resultType).toBe(RESULT_TYPE.FAILED);
  });
});
