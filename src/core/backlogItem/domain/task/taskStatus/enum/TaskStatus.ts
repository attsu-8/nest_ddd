export type TaskStatus = keyof [typeof TaskStatus];

export const TaskStatus = {
  NOT_STATED: 1,
  IN_PROGRESS: 2,
  DONE: 3,
} as const;
