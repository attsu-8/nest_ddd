export type ResultType<T, E extends Error> =
  | ResultSucceeded<T>
  | ResultFailed<E>;

export const RESULT_TYPE = {
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
} as const;

type RESULT_TYPE = [keyof typeof RESULT_TYPE];

export class ResultSucceeded<T> {
  public readonly resultType = RESULT_TYPE.SUCCEEDED;

  public constructor(public readonly value: T) {}

  unwrap(): T {
    return this.value;
  }

  // or<U>(_: U): T {
  //   return this.value;
  // }
}

export class ResultFailed<E extends Error> {
  public readonly resultType = RESULT_TYPE.FAILED;

  public constructor(public readonly error: E) {}

  unwrap(): never {
    throw new Error(`Tried to unwrap Error: ${this.error}`);
  }

  or<U>(value: U): U {
    return value;
  }
}
