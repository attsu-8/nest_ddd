import { TaskRepositoryPort } from 'src/core/port/secondary/task/repository/TaskRepositoryPort';
import { TaskInMemoryRepositoryAdapter } from './TaskInMemoryRepositoryAdapter';

export default [
  // Repository
  {
    provide: TaskRepositoryPort,
    useClass: TaskInMemoryRepositoryAdapter,
  },
];
