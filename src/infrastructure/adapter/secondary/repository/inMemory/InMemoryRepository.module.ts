import { Module, Provider } from '@nestjs/common';
import { TaskRepositoryPort } from 'src/core/task/port/secondary/repository/TaskRepositoryPort';

import { TaskInMemoryRepositoryAdapter } from './TaskInMemoryRepositoryAdapter';

const repositoryProviders: Provider<TaskInMemoryRepositoryAdapter>[] = [
  // Repository
  {
    provide: TaskRepositoryPort,
    useClass: TaskInMemoryRepositoryAdapter,
  },
];

@Module({
  providers: [...repositoryProviders],
  exports: [...repositoryProviders],
})
export class InMemoryRepositoryModule {}
