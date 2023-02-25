import { ResultFailed, ResultSucceeded, ResultType } from 'src/shared/Result';

export class StoryPonitValueObject {
  private _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  static create(
    mayBeStoryPoint: number,
  ): ResultType<StoryPonitValueObject, Error> {
    const storyPonts = [0, 1, 2, 3, 5, 8, 13, 21];

    if (!storyPonts.includes(mayBeStoryPoint)) {
      return new ResultFailed(Error('story point must fibonacci number.'));
    }

    return new ResultSucceeded(new StoryPonitValueObject(mayBeStoryPoint));
  }
}
