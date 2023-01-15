import { TaskRepositoryPort } from 'src/core/port/secondary/repository/TaskRepositoryPort';
import { TaskInMemoryRepositoryAdapter } from './TaskInMemoryRepositoryAdapter';

export default [
  // Repository
  {
    provide: TaskRepositoryPort,
    useClass: TaskInMemoryRepositoryAdapter,
  },
];
