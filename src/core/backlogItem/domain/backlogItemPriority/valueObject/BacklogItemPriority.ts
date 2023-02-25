import { ResultFailed, ResultSucceeded, ResultType } from 'src/shared/Result';

export class BacklogItemPriorityValueObject {
  private _value: number;
  private constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  static create(
    maybeBacklogItemPriority: number,
  ): ResultType<BacklogItemPriorityValueObject, Error> {
    const backlogItemPriorities = [1, 2, 3, 4, 5];

    if (!backlogItemPriorities.includes(maybeBacklogItemPriority)) {
      return new ResultFailed(Error('backlog priority must 1 ~ 5'));
    }

    return new ResultSucceeded(
      new BacklogItemPriorityValueObject(maybeBacklogItemPriority),
    );
  }
}
