import { StoryPonitValueObject } from 'src/core/backlogItem/domain/storyPoint/valueObject/StoryPointValueObject';
import { RESULT_TYPE } from 'src/shared/Result';

describe('# StoryPointValueObject', () => {
  describe('正常ケース', () => {
    const testTable = [
      [0, 0],
      [1, 1],
      [2, 2],
      [3, 3],
      [5, 5],
      [8, 8],
      [13, 13],
      [21, 21],
    ];
    test.each(testTable)(
      '0及び1~21までのフィボナッチ数で正常に作成できる',
      (input, expected) => {
        const storyPoint = StoryPonitValueObject.create(input).unwrap();

        expect(storyPoint.value).toBe(expected);
      },
    );
  });

  describe('異常ケース', () => {
    test('0と1~21までのフィボナッチ数以外でストーリーポイントの作成はできない', () => {
      const storyPoint = StoryPonitValueObject.create(6);

      expect(storyPoint.resultType).toBe(RESULT_TYPE.FAILED);
    });
  });
});
